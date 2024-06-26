# การตั้งค่าและโครงสร้างโปรเจกต์

## การตั้งค่าคอมไพลเลอร์ TypeScript

ไฟล์การตั้งค่าคอมไพลเลอร์ TypeScript คือ `tsconfig.json` ไฟล์นี้ใช้เพื่อกำหนดค่าคอมไพลเลอร์ TypeScript คอมไพลเลอร์ TypeScript จะใช้ไฟล์นี้เพื่อตัดสินใจว่าจะคอมไพล์โปรเจกต์อย่างไร ใช้โหมด `strict` เพื่อเปิดใช้ตัวเลือกการตรวจสอบประเภทอย่างเข้มงวดทั้งหมด ซึ่งจะช่วยให้คุณเจอข้อผิดพลาดได้มากขึ้นในระหว่างการคอมไพล์


```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

## โครงสร้างโปรเจกต์

::: warning คำชี้แจงที่สำคัญ
การจัดระเบียบโครงสร้างโปรเจกต์และชนิดข้อมูลอาจแตกต่างกันไปขึ้นอยู่กับขนาดและความซับซ้อนของโปรเจกต์ จากประสบการณ์ของผม การออกแบบโครงสร้างโปรเจกต์ต่อไปนี้ใช้ได้ดีกับโปรเจกต์ส่วนใหญ่ อย่างไรก็ตาม ความต้องการและบริบทเฉพาะของโปรเจกต์อาจจำเป็นต้องมีการปรับเปลี่ยนจากแนวปฏิบัติเหล่านี้ ความยืดหยุ่นและการคิดวิเคราะห์เป็นกุญแจสำคัญในการนำหลักการเหล่านี้ไปใช้อย่างมีประสิทธิภาพ
:::

### การจัดระเบียบโมดูล (Module Organization)

**แนวทางโมดูล** (Modular Approach): ผมมักจัดระเบียบโค้ดและชนิดข้อมูลในลักษณะโมดูล ซึ่งหมายถึงการสร้างโมดูลย่อย ๆ ที่มีความเป็นอิสระแทนที่จะมีทุกอย่างในไฟล์เดียว ฟังก์ชันหรือคลาสที่ทำงานร่วมกันบ่อย ๆ จะถูกจัดให้อยู่ในโมดูลเดียวกัน

แนวทางนี้สอดคล้องกับหลักการความรับผิดชอบเดียว (Single Responsibility Principle - SRP) จากหลักการ SOLID ที่ส่งเสริมให้นักพัฒนาจัดโครงสร้างโค้ดให้แต่ละโมดูลหรือไฟล์มีความรับผิดชอบเพียงอย่างเดียว

### การจัดระเบียบการประกาศชนิดข้อมูล (Type Definition Organization)

**ชนิดข้อมูลแบบใกล้เคียง** (Inline Types): ชนิดข้อมูลที่เฉพาะเจาะจงกับโมดูล (เช่น พารามิเตอร์สำหรับฟังก์ชันหรือคลาส) จะถูกกำหนดภายในโมดูลนั้น ๆ วิธีนี้ช่วยให้ชนิดข้อมูลที่เกี่ยวข้องอยู่ใกล้กับโค้ดที่ใช้งาน ทำให้โค้ดอ่านง่ายและเข้าใจง่ายขึ้น ซึ่งมีประโยชน์โดยเฉพาะสำหรับชนิดข้อมูลที่เฉพาะเจาะจงกับโมดูลหนึ่ง ๆ และไม่ได้ใช้ซ้ำที่อื่น

**ชนิดข้อมูลที่ใช้ร่วมกัน** (Shared Types): สำหรับชนิดข้อมูลที่ต้องใช้ร่วมกันระหว่างหลายคลาส ผมจะสร้างไฟล์แยกต่างหาก โดยปกติจะใช้ชื่อว่า `types.ts` ภายในโมดูลเดียวกัน ไฟล์นี้จะประกอบด้วยอินเตอร์เฟสหรือชนิดข้อมูลที่ใช้ร่วมกันซึ่งเฉพาะเจาะจงกับโมดูลนั้น ๆ (Domain อย่างเคร่งครัด) วิธีนี้ช่วยป้องกันไม่ให้การประกาศชนิดข้อมูลรกในไฟล์โมดูลหลักและช่วยให้ชนิดข้อมูลที่เกี่ยวข้องถูกจัดระเบียบ

**ชนิดข้อมูลทั่วไป/ใช้ร่วมกันทั้งโปรเจกต์** (Common/Global Types): นอกจากนี้ยังมีชนิดข้อมูลทั่วไปที่ใช้ทั่วทุกโมดูล เช่น ชนิดข้อมูลที่ไม่เฉพาะเจาะจงกับ business logic หรือโมดูลใด ๆ ชนิดข้อมูลเหล่านี้จะถูกวางไว้ในไดเรกทอรีทั่วไป ทำให้สามารถเข้าถึงได้จากส่วนใดส่วนหนึ่งของโปรเจกต์ วิธีนี้ช่วยให้ชนิดข้อมูลทั่วไปเข้าถึงได้ง่ายและไม่จำเป็นต้องทำซ้ำ

### ไฟล์ประกาศชนิดข้อมูล (Type Declaration Files)

ผมแนะนำให้หลีกเลี่ยงการใช้ไฟล์ `.d.ts` เว้นแต่จำเป็นจริง ๆ ควรใช้ไฟล์เหล่านี้อย่างระมัดระวัง เนื่องจากการประกาศสำหรับใช้ร่วมกันทั้งโปรเจกต์ (global declarations) อาจจัดการและบำรุงรักษาได้ยากเมื่อโปรเจกต์ขยายตัว นอกจากนี้ ยังอาจทำให้เกิดความไม่ตรงกันระหว่างชนิดข้อมูลในระหว่างการคอมไพล์และการรันไทม์ ทำให้เกิดความซับซ้อนมากขึ้น ควรประกาศชนิดข้อมูลภายในโมดูลและใช้เส้นทางการนำเข้าหรือการนำเข้าแบบ wildcard (`import * as types from ...`) เพื่อจัดการการนำเข้าชนิดข้อมูลอย่างมีประสิทธิภาพ

อย่างไรก็ตาม ไฟล์ `.d.ts` สามารถมีประโยชน์มากในการประกาศชนิดข้อมูลสำหรับใช้ร่วมกันทั้งโปรเจกต์ (global types) โดยเฉพาะเมื่อทำงานกับไลบรารีที่ติดตั้งจากภายนอก (third-party libraries) หรือเมื่อขยายชนิดข้อมูลที่มีมาให้ใช้งานเริ่มต้น (built-in types) การหลีกเลี่ยงการใช้ไฟล์ `.d.ts` อย่างสมบูรณ์อาจไม่เป็นไปได้ในทุกสถานการณ์ การใช้ไฟล์เหล่านี้อย่างรอบคอบและจัดการอย่างระมัดระวังเพื่อหลีกเลี่ยงปัญหาเป็นสิ่งสำคัญ

### สรุป

หลักการสำหรับการจัดระเบียบชนิดข้อมูลคล้ายกับการจัดระเบียบโค้ด JavaScript: แยกตาม Domain, โมดูล และ business logic หากคุณใช้เฟรมเวิร์กที่รองรับการออกแบบชนิดข้อมูลแบบปลอดภัย (Type-safe Design Patterns) ความจำเป็นในการเขียนการประกาศชนิดข้อมูลอาจลดลงอย่างมาก เนื่องจากเฟรมเวิร์กเหล่านี้มักจะคาดเดาชนิดข้อมูลโดยอัตโนมัติ ในกรณีนี้ คุณเพียงแค่ต้องประกาศ interface ของข้อมูลเพื่อเสริมการคาดเดาชนิดข้อมูลของเฟรมเวิร์ก

วิธีนี้ช่วยให้โครงสร้างโปรเจกต์สะอาดและดูแลรักษาง่าย ซึ่งสามารถขยายตัวได้ดีเมื่อโปรเจกต์เติบโตขึ้น