// Microsoft Graph API Integration for Kanban Teams App
// This is a sample implementation for OneDrive integration

class GraphAPIClient {
    constructor(clientId, tenantId) {
        this.clientId = clientId;
        this.tenantId = tenantId;
        this.accessToken = null;
        this.baseUrl = 'https://graph.microsoft.com/v1.0';
    }

    // Get access token using Teams SSO
    async getAccessToken() {
        try {
            if (typeof microsoftTeams !== 'undefined') {
                // In Teams environment
                this.accessToken = await microsoftTeams.authentication.getAuthToken();
            } else {
                // For web browser, use MSAL.js
                throw new Error('Teams SSO not available. Use MSAL.js for web authentication.');
            }
            return this.accessToken;
        } catch (error) {
            console.error('Authentication failed:', error);
            throw error;
        }
    }

    // Make Graph API request
    async makeRequest(endpoint, method = 'GET', body = null) {
        if (!this.accessToken) {
            await this.getAccessToken();
        }

        const url = `${this.baseUrl}${endpoint}`;
        const options = {
            method,
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Graph API error: ${response.status} ${response.statusText}`);
        }

        return response.json();
    }

    // Get OneDrive root folder
    async getOneDriveRoot() {
        return await this.makeRequest('/me/drive/root');
    }

    // Create folder in OneDrive
    async createFolder(folderName, parentPath = '/') {
        const endpoint = parentPath === '/' ? 
            '/me/drive/root/children' : 
            `/me/drive/root:${parentPath}:/children`;

        return await this.makeRequest(endpoint, 'POST', {
            name: folderName,
            folder: {}
        });
    }

    // Upload Excel file to OneDrive
    async uploadExcelFile(filePath, data) {
        const endpoint = `/me/drive/root:${filePath}:/content`;
        
        // Convert data to Excel format (simplified)
        const excelContent = this.createExcelContent(data);
        
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            },
            body: excelContent
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }

        return response.json();
    }

    // Download Excel file from OneDrive
    async downloadExcelFile(filePath) {
        const endpoint = `/me/drive/root:${filePath}:/content`;
        
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status}`);
        }

        return response.blob();
    }

    // Get shared folder from OneDrive link
    async getSharedFolder(shareLink) {
        // Convert share link to share token
        const shareToken = this.encodeShareUrl(shareLink);
        const endpoint = `/shares/${shareToken}/driveItem`;
        
        return await this.makeRequest(endpoint);
    }

    // Encode share URL for Graph API
    encodeShareUrl(shareUrl) {
        const base64 = btoa(shareUrl);
        return `u!${base64.replace(/=+$/, '').replace(/\//g, '_').replace(/\+/g, '-')}`;
    }

    // Create Excel content (simplified CSV format)
    createExcelContent(data) {
        const { lists, cards } = data;
        
        // Create CSV content
        let csvContent = 'ID,Title,Description,AssignedTo,DueDate,Priority,Status\n';
        
        cards.forEach(card => {
            const row = [
                card.id || '',
                `"${card.title || ''}"`,
                `"${card.description || ''}"`,
                `"${card.assignedTo || ''}"`,
                card.dueDate || '',
                card.priority || '',
                `"${card.status || ''}"`
            ].join(',');
            csvContent += row + '\n';
        });

        // Convert to blob (in real implementation, use proper Excel library)
        return new Blob([csvContent], { type: 'text/csv' });
    }

    // Parse Excel content (simplified)
    parseExcelContent(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const csv = e.target.result;
                    const lines = csv.split('\n');
                    const headers = lines[0].split(',');
                    const cards = [];

                    for (let i = 1; i < lines.length; i++) {
                        if (lines[i].trim()) {
                            const values = lines[i].split(',');
                            const card = {
                                id: values[0],
                                title: values[1]?.replace(/"/g, ''),
                                description: values[2]?.replace(/"/g, ''),
                                assignedTo: values[3]?.replace(/"/g, ''),
                                dueDate: values[4],
                                priority: values[5],
                                status: values[6]?.replace(/"/g, '')
                            };
                            cards.push(card);
                        }
                    }

                    resolve({ cards });
                } catch (error) {
                    reject(error);
                }
            };
            reader.readAsText(blob);
        });
    }
}

// Usage example for Kanban app
class KanbanOneDriveSync {
    constructor(clientId, tenantId) {
        this.graphClient = new GraphAPIClient(clientId, tenantId);
        this.folderPath = '/KanbanBoard';
        this.fileName = 'KanbanData.xlsx';
    }

    // Save Kanban data to OneDrive
    async saveToOneDrive(lists, cards) {
        try {
            // Ensure folder exists
            await this.ensureFolderExists();

            // Upload data
            const filePath = `${this.folderPath}/${this.fileName}`;
            const data = { lists, cards };
            
            const result = await this.graphClient.uploadExcelFile(filePath, data);
            console.log('Saved to OneDrive:', result);
            
            return true;
        } catch (error) {
            console.error('Error saving to OneDrive:', error);
            return false;
        }
    }

    // Load Kanban data from OneDrive
    async loadFromOneDrive() {
        try {
            const filePath = `${this.folderPath}/${this.fileName}`;
            const blob = await this.graphClient.downloadExcelFile(filePath);
            const data = await this.graphClient.parseExcelContent(blob);
            
            console.log('Loaded from OneDrive:', data);
            return data;
        } catch (error) {
            console.error('Error loading from OneDrive:', error);
            return null;
        }
    }

    // Ensure KanbanBoard folder exists
    async ensureFolderExists() {
        try {
            await this.graphClient.createFolder('KanbanBoard');
        } catch (error) {
            // Folder might already exist, ignore error
            console.log('Folder already exists or creation failed:', error.message);
        }
    }

    // Sync with shared OneDrive folder
    async syncWithSharedFolder(shareLink) {
        try {
            const sharedFolder = await this.graphClient.getSharedFolder(shareLink);
            console.log('Shared folder info:', sharedFolder);
            
            // Implementation for shared folder sync
            // This requires additional permissions and handling
            
            return sharedFolder;
        } catch (error) {
            console.error('Error accessing shared folder:', error);
            return null;
        }
    }
}

// Export for use in main application
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GraphAPIClient, KanbanOneDriveSync };
}