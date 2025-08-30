# วิธีลง Kanban App ใน Microsoft Teams

## ขั้นตอนที่ 1: เตรียมไฟล์

### 1.1 อัปเดต manifest.json
```json
{
  "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.16/MicrosoftTeams.schema.json",
  "manifestVersion": "1.16",
  "version": "1.0.0",
  "id": "kanban-app-12345",
  "packageName": "com.kanban.app",
  "developer": {
    "name": "Your Company",
    "websiteUrl": "https://your-domain.com",
    "privacyUrl": "https://your-domain.com/privacy",
    "termsOfUseUrl": "https://your-domain.com/terms"
  },
  "icons": {
    "color": "color.png",
    "outline": "outline.png"
  },
  "name": {
    "short": "Kanban Board",
    "full": "Kanban Board for Teams"
  },
  "description": {
    "short": "Simple Kanban board for task management",
    "full": "A lightweight Kanban board application for managing tasks within Microsoft Teams"
  },
  "accentColor": "#0078d4",
  "staticTabs": [
    {
      "entityId": "kanban",
      "name": "Kanban Board",
      "contentUrl": "https://your-domain.com/kanban.html",
      "scopes": ["personal", "groupchat", "team"]
    }
  ],
  "permissions": ["identity", "messageTeamMembers"],
  "validDomains": ["your-domain.com"]
}
```

### 1.2 สร้างไอคอน
- **color.png**: 192x192 pixels (สีเต็ม)
- **outline.png**: 32x32 pixels (ขาวดำ)

## ขั้นตอนที่ 2: Host ไฟล์

### 2.1 เลือกวิธี Host
**ตัวเลือก A: GitHub Pages (ฟรี)**
1. สร้าง GitHub repository
2. Upload `kanban.html`
3. เปิด GitHub Pages
4. ได้ URL: `https://username.github.io/repo-name/kanban.html`

**ตัวเลือก B: Azure Static Web Apps (ฟรี)**
1. สร้าง Azure account
2. Deploy Static Web App
3. ได้ URL: `https://app-name.azurestaticapps.net/kanban.html`

**ตัวเลือก C: Netlify (ฟรี)**
1. สร้าง Netlify account
2. Drag & drop ไฟล์
3. ได้ URL: `https://app-name.netlify.app/kanban.html`

### 2.2 อัปเดต manifest.json
แทนที่ `your-domain.com` ด้วย URL จริง

## ขั้นตอนที่ 3: สร้าง App Package

### 3.1 รวมไฟล์
สร้างไฟล์ zip ที่มี:
```
kanban-app.zip
├── manifest.json
├── color.png
└── outline.png
```

### 3.2 ตรวจสอบ
- ไฟล์ zip ต้องไม่เกิน 4MB
- manifest.json ต้อง valid JSON
- ไอคอนต้องมีขนาดถูกต้อง

## ขั้นตอนที่ 4: Upload ไป Teams

### 4.1 สำหรับ Personal Use
1. เปิด Microsoft Teams
2. ไปที่ **Apps** (ซ้ายล่าง)
3. คลิก **Upload a custom app**
4. เลือก **Upload for me**
5. เลือกไฟล์ zip
6. คลิก **Add**

### 4.2 สำหรับ Team/Organization
1. ไปที่ **Teams Admin Center**
2. **Manage apps** > **Upload custom app**
3. เลือกไฟล์ zip
4. **Submit for approval**
5. รอ Admin อนุมัติ

## ขั้นตอนที่ 5: เพิ่มใน Team

### 5.1 เพิ่มเป็น Tab
1. ไปที่ Team channel
2. คลิก **+** (Add a tab)
3. หา **Kanban Board** app
4. คลิก **Add**
5. ตั้งชื่อ tab
6. คลิก **Save**

### 5.2 เพิ่มใน Chat
1. ไปที่ Group chat
2. คลิก **+** (Add app)
3. หา **Kanban Board**
4. คลิก **Add**

## การแก้ปัญหา

### ปัญหาที่พบบ่อย:
1. **"App not found"** → ตรวจสอบ manifest.json
2. **"Invalid domain"** → อัปเดต validDomains
3. **"HTTPS required"** → ใช้ HTTPS URL เท่านั้น
4. **"Permission denied"** → ติดต่อ Teams Admin

### การ Debug:
1. เปิด Developer Tools (F12)
2. ดู Console สำหรับ error
3. ตรวจสอบ Network requests

## เสร็จแล้ว! 🎉
ตอนนี้ทีมสามารถใช้ Kanban board ร่วมกันได้แล้ว