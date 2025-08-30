# Microsoft Graph API Setup สำหรับ OneDrive Integration

## ขั้นตอนการ Setup

### 1. สร้าง Azure App Registration

1. ไปที่ [Azure Portal](https://portal.azure.com)
2. เลือก **Azure Active Directory** > **App registrations**
3. คลิก **New registration**
4. ใส่ข้อมูล:
   - **Name**: `Kanban Teams App`
   - **Supported account types**: `Accounts in this organizational directory only`
   - **Redirect URI**: `https://sakanarmmfec.github.io/mfeckanban/kanban.html`
5. คลิก **Register**

### 2. Configure API Permissions

1. ไปที่ **API permissions**
2. คลิก **Add a permission**
3. เลือก **Microsoft Graph** > **Delegated permissions**
4. เพิ่ม permissions:
   - `Files.ReadWrite` - อ่าน/เขียนไฟล์ OneDrive
   - `Files.ReadWrite.All` - อ่าน/เขียนไฟล์ทั้งหมด
   - `Sites.ReadWrite.All` - อ่าน/เขียน SharePoint (ถ้าต้องการ)
5. คลิก **Grant admin consent**

### 3. Get Application Details

1. ไปที่ **Overview**
2. Copy **Application (client) ID**
3. Copy **Directory (tenant) ID**

### 4. อัปเดต manifest.json

```json
{
  "webApplicationInfo": {
    "id": "YOUR_CLIENT_ID_HERE",
    "resource": "https://graph.microsoft.com"
  },
  "authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": "Files.ReadWrite",
          "type": "Delegated"
        },
        {
          "name": "Files.ReadWrite.All", 
          "type": "Delegated"
        }
      ]
    }
  }
}
```

## Graph API Endpoints สำหรับ OneDrive

### 1. Get OneDrive Root
```
GET https://graph.microsoft.com/v1.0/me/drive/root
```

### 2. Create Folder
```
POST https://graph.microsoft.com/v1.0/me/drive/root/children
Content-Type: application/json

{
  "name": "KanbanBoard",
  "folder": {}
}
```

### 3. Upload Excel File
```
PUT https://graph.microsoft.com/v1.0/me/drive/root:/KanbanBoard/KanbanData.xlsx:/content
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

[Excel file content]
```

### 4. Read Excel File
```
GET https://graph.microsoft.com/v1.0/me/drive/root:/KanbanBoard/KanbanData.xlsx:/content
```

### 5. Get Shared Folder (จาก share link)
```
POST https://graph.microsoft.com/v1.0/shares/{share-token}/driveItem
```

## Authentication Flow

### 1. Teams SSO (แนะนำ)
```javascript
// ใน Teams environment
const authToken = await microsoftTeams.authentication.getAuthToken();
```

### 2. MSAL.js (สำหรับ web browser)
```javascript
// สำหรับใช้นอก Teams
const msalConfig = {
  auth: {
    clientId: "YOUR_CLIENT_ID",
    authority: "https://login.microsoftonline.com/YOUR_TENANT_ID"
  }
};
```

## ข้อจำกัดและข้อควรระวัง

### Security
- ต้องใช้ HTTPS เท่านั้น
- Token มี expiration time
- ต้อง handle refresh token

### Permissions
- User ต้อง consent permissions
- Admin อาจต้อง pre-approve app
- Shared folder ต้องมีสิทธิ์เข้าถึง

### Rate Limits
- Graph API มี throttling
- ควร implement retry logic
- Cache data เมื่อเป็นไปได้

## การทดสอบ

### 1. Graph Explorer
- ใช้ [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer) ทดสอบ API calls

### 2. Postman
- Import Graph API collection
- ทดสอบ authentication flow

### 3. Local Development
- ใช้ ngrok สำหรับ HTTPS localhost
- ตั้ง redirect URI เป็น ngrok URL

## Production Deployment

### 1. App Certification
- Submit app สำหรับ Microsoft certification
- ผ่าน security review

### 2. Tenant Deployment
- Deploy ผ่าน Teams Admin Center
- Configure organization policies

### 3. Monitoring
- ใช้ Application Insights
- Monitor API usage และ errors

## ตัวอย่าง Implementation

ดูไฟล์ `graph-api-integration.js` สำหรับ code ตัวอย่างการ integrate Graph API จริง