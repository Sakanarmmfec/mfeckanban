# วิธีเอา Kanban App ไปใช้ใน Microsoft Teams - ง่ายๆ

## ขั้นตอนที่ 1: สร้างไอคอน (เปิดอยู่แล้ว)

1. **เปิดไฟล์ `create-icons.html`** (เปิดอยู่แล้ว)
2. **Download ไอคอน 2 ไฟล์:**
   - คลิก **"Download color.png"** (192x192)
   - คลิก **"Download outline.png"** (32x32)
3. **เก็บไฟล์ไว้ในโฟลเดอร์ Kanban**

## ขั้นตอนที่ 2: สร้าง Teams App Package

1. **สร้างไฟล์ zip** ชื่อ `kanban-teams-app.zip`
2. **รวมไฟล์ 3 ไฟล์:**
   ```
   kanban-teams-app.zip
   ├── manifest.json
   ├── color.png
   └── outline.png
   ```

## ขั้นตอนที่ 3: Upload ไป Teams

### สำหรับ Personal Use:
1. **เปิด Microsoft Teams**
2. **ไปที่ Apps** (ซ้ายล่าง)
3. **คลิก "Upload a custom app"**
4. **เลือก "Upload for me"**
5. **เลือกไฟล์ `kanban-teams-app.zip`**
6. **คลิก "Add"**

### สำหรับ Team/Organization:
1. **ไปที่ Teams Admin Center**
2. **Manage apps > Upload custom app**
3. **เลือกไฟล์ `kanban-teams-app.zip`**
4. **Submit for approval**
5. **รอ Admin อนุมัติ**

## ขั้นตอนที่ 4: เพิ่มใน Team

1. **ไปที่ Team channel**
2. **คลิก + (Add a tab)**
3. **หา "Kanban Board" app**
4. **คลิก "Add"**
5. **ตั้งชื่อ tab: "Kanban Board"**
6. **คลิก "Save"**

## ขั้นตอนที่ 5: ตั้งค่า JSONBin (ครั้งเดียว)

1. **เปิด Kanban tab ใน Teams**
2. **คลิก ⚙️ Configuration**
3. **เลือก "JSONBin.io"**
4. **ใส่ Bin ID และ Access Token**
5. **คลิก "Save Configuration"**

## 🎉 เสร็จแล้ว!

ตอนนี้ทีมสามารถใช้ Kanban board ร่วมกันได้:
- ✅ เพิ่ม/แก้ไข/ลบ การ์ด
- ✅ ลากการ์ดระหว่างคอลัมน์
- ✅ ข้อมูล sync กันอัตโนมัติ
- ✅ เข้าถึงได้จากทุกที่

## การแก้ปัญหา

### ถ้า Upload App ไม่ได้:
- ตรวจสอบไฟล์ zip มีครบ 3 ไฟล์
- ตรวจสอบ manifest.json ถูกต้อง
- ลองใช้ zip tool อื่น

### ถ้าไอคอนไม่แสดง:
- ตรวจสอบขนาดไอคอน (192x192 และ 32x32)
- ตรวจสอบชื่อไฟล์ (color.png, outline.png)

### ถ้าข้อมูลไม่ sync:
- ตรวจสอบ JSONBin configuration
- ตรวจสอบ internet connection
- ลอง refresh หน้า Teams