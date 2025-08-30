# JSONBin.io Setup Guide - ง่ายมาก!

## ขั้นตอนการใช้ JSONBin.io (ฟรี)

### 1. สร้าง Account
1. ไปที่ [jsonbin.io](https://jsonbin.io)
2. คลิก **"Sign Up"** (มุมขวาบน)
3. ใส่อีเมลและรหัสผ่าน
4. ยืนยันอีเมล

### 2. สร้าง Bin ใหม่
1. หลังจาก login แล้ว คลิก **"Create Bin"**
2. ใส่ข้อมูลเริ่มต้น:
```json
{
  "lists": ["📋 Backlog", "🔄 In Progress", "👀 Review", "✅ Done"],
  "cards": [],
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```
3. คลิก **"Create"**

### 3. Copy Bin ID
หลังจากสร้าง Bin แล้ว จะได้ URL แบบนี้:
```
https://jsonbin.io/65f1234567890abcdef12345
```

**Bin ID คือ:** `65f1234567890abcdef12345`

### 4. Copy API Key (สำหรับ Private Bin)
1. ไปที่ **"API Keys"** ในเมนู
2. คลิก **"Create Access Key"**
3. ตั้งชื่อ: `Kanban App`
4. Copy API Key ที่ได้

### 5. ใส่ใน Kanban App
1. เปิด Kanban App
2. คลิก **⚙️ Configuration**
3. เลือก **"JSONBin.io"**
4. ใส่ **Bin ID**: `65f1234567890abcdef12345`
5. ใส่ **Access Token**: `$2a$10$...` (API Key ที่ copy มา)
6. คลิก **"Test Connection"**
7. คลิก **"Save Configuration"**

## ตัวอย่าง URL และ ID

### Public Bin (ไม่ต้อง API Key)
- **URL**: `https://jsonbin.io/65f1234567890abcdef12345`
- **Bin ID**: `65f1234567890abcdef12345`
- **API Key**: ไม่ต้องใส่

### Private Bin (ต้อง API Key)
- **URL**: `https://jsonbin.io/65f1234567890abcdef12345`
- **Bin ID**: `65f1234567890abcdef12345`
- **API Key**: `$2a$10$abcd1234efgh5678ijkl9012mnop3456`

## ข้อดีของ JSONBin.io

✅ **ฟรี** - ไม่เสียเงิน  
✅ **ง่าย** - ไม่ต้อง setup ซับซ้อน  
✅ **เร็ว** - ใช้ได้ทันที  
✅ **แชร์ได้** - ทีมเข้าถึงข้อมูลเดียวกัน  
✅ **Backup** - ข้อมูลไม่หาย  

## Free Tier Limits
- **100 requests/minute**
- **10,000 requests/month**
- **100KB per bin**

เพียงพอสำหรับ Kanban app แน่นอน!

## การแก้ปัญหา

### ถ้า Test Connection ไม่ผ่าน:
1. ตรวจสอบ Bin ID ถูกต้องหรือไม่
2. ถ้าเป็น Private Bin ต้องใส่ API Key
3. ลองสร้าง Bin ใหม่

### ถ้าข้อมูลไม่ save:
1. ตรวจสอบ internet connection
2. ลอง refresh หน้าเว็บ
3. ตรวจสอบ Console (F12) มี error หรือไม่

## เสร็จแล้ว! 🎉
ตอนนี้ Kanban app จะ save ข้อมูลไปที่ JSONBin.io อัตโนมัติ
ทุกคนในทีมสามารถเข้าถึงข้อมูลเดียวกันได้!