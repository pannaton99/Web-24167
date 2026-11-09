# เริ่มใหม่ทั้งหมด (โฟลเดอร์ใหม่ + ฐานข้อมูลใหม่ + โปรเจกต์ใหม่)

1. แตก zip ไว้ที่ C:\peem-web  (คลิกขวา Extract All เลือกโฟลเดอร์ C:\peem-web)
2. เปิด cmd แล้ว:   cd /d C:\peem-web\SPUPortfolio
3. สร้างฐานข้อมูลใหม่:   npx wrangler d1 create peem_portfolio_db
   -> จะขึ้น database_id ให้ก๊อปไว้
4. เปิด wrangler.toml (notepad wrangler.toml) แทนที่ "ใส่-database_id-ตรงนี้" ด้วย id ที่ได้ แล้ว Save
5. สร้างตาราง:   npx wrangler d1 execute peem_portfolio_db --remote --file=schema.sql
6. อัปโหลดเว็บ:   npx wrangler pages deploy . --project-name pannaton-spu
7. ดูข้อความที่ส่งเข้ามา:   npx wrangler d1 execute peem_portfolio_db --remote --command "SELECT * FROM messages ORDER BY id DESC"
