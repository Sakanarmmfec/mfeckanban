# SharePoint Lists Setup สำหรับ Teams App

## ขั้นตอนการ Setup

### 1. อัปเดต manifest.json
```json
{
  "permissions": [
    "identity",
    "messageTeamMembers"
  ],
  "webApplicationInfo": {
    "id": "your-app-id",
    "resource": "https://graph.microsoft.com"
  },
  "authorization": {
    "permissions": {
      "resourceSpecific": [
        {
          "name": "TeamSettings.Read.Group",
          "type": "Application"
        },
        {
          "name": "ChannelMessage.Read.Group", 
          "type": "Application"
        }
      ]
    }
  }
}
```

### 2. SharePoint List Structure
ระบบจะสร้าง SharePoint List ชื่อ "KanbanCards" อัตโนมัติ พร้อม columns:

- **Title** (Single line of text) - ชื่อการ์ด
- **Description** (Multiple lines of text) - รายละเอียด
- **AssignedTo** (Single line of text) - ผู้รับผิดชอบ
- **DueDate** (Date) - วันครบกำหนด
- **Priority** (Choice: low, medium, high, urgent) - ความสำคัญ
- **Status** (Single line of text) - สถานะ

### 3. การทำงาน

**ใน Teams:**
- ใช้ SharePoint Lists ของ Team
- ข้อมูล sync real-time
- ทุกคนใน team เห็นข้อมูลเดียวกัน

**นอก Teams:**
- Fallback ไป localStorage
- ข้อมูลเก็บในเครื่อง

### 4. Permissions Required
- `Sites.ReadWrite.All` - อ่าน/เขียน SharePoint
- `Group.Read.All` - อ่านข้อมูล Team

## การใช้งาน
1. Upload app ไป Teams
2. เพิ่มเป็น tab ใน channel
3. ระบบจะสร้าง SharePoint List อัตโนมัติ
4. เริ่มใช้งาน Kanban board ได้เลย!