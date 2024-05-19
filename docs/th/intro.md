---
outline: deep
---

# บทนำ

::: warning คำเตือน
ตอนนี้ยังไม่ได้เขียนแปลไทยไว้ แต่สามารถอ่านแบบภาษาอังกฤษได้ก่อน และรอให้เขียนเสร็จแล้วจะมาแปลเป็นภาษาไทยต่อ และบางหน้าทดลองแปลด้วย AI ไว้บ้าง ถ้าคำที่เขียนไม่สละสลวย สามารถช่วยแก้ไขได้

โดยที่ภาษาอังกฤษจะเป็น Single Source of Truth, และจะไม่มีการใส่เนื้อหาเพิ่มในส่วนของภาษาไทย แต่จะเป็นการแปลมาเท่านั้น โดยภาษาไทยผมได้เตรียม Template ไว้แล้วสามารถ copy เนื้อหาภาษาอังกฤษ และสามารถเปิด Issue หรือส่ง Pull Request ได้ที่ [GitHub](https://github.com/mildronize/type-safe-design-pattern)
:::

::: info ข้อมูล
หนังสือเล่มนี้มีความซับซ้อนมากกว่าคู่มือ TypeScript เหมาะสำหรับนักพัฒนาที่คุ้นเคยกับ TypeScript อยู่แล้วและต้องการปรับปรุงคุณภาพและการออกแบบโค้ดของตน
:::

หนังสือเล่มนี้เป็นการรวบรวมแนวปฏิบัติที่ดีที่สุดและรูปแบบการออกแบบใน TypeScript โดยมีจุดมุ่งหมายเพื่อเป็นแนวทางสำหรับนักพัฒนาที่ต้องการปรับปรุงคุณภาพและการออกแบบโค้ดของตน หนังสือครอบคลุมหัวข้อหลากหลาย ตั้งแต่การตั้งค่า TypeScript โครงสร้างข้อมูล รูปแบบการออกแบบ และอื่นๆ

หลังจากที่ผมได้ศึกษาดูโค้ดของโปรเจกต์โอเพ่นซอร์สที่เป็นที่รู้จักหลายโปรเจกต์ เช่น Zod, tRPC, Hono, Elysia และ ts-odata-client

## คุยกับผู้เขียน

ตอนนี้ผมกำลังเขียน E-book เล่มใหม่ โปรดติดตามและให้การสนับสนุน! หนังสือเล่มนี้สำหรับผู้ใช้ TypeScript ระดับสูง (ไม่เหมาะสำหรับผู้เริ่มต้น อาจจะยากเกินไป) ชื่อหนังสือคือ **"Type-safe Design Pattern in Modern TypeScript."** รูปแบบการออกแบบทุกอย่างไม่สามารถทำให้เป็น Type-safe ได้ แต่ผมได้รวบรวมรูปแบบการออกแบบที่ใช้บ่อยในไลบรารี TypeScript สมัยใหม่

นอกจากนี้ผมยังไม่เห็นหนังสือหรือบทความที่ครอบคลุมหัวข้อเหล่านี้ ผมหวังว่าหนังสือเล่มนี้จะช่วยให้คุณปรับปรุงคุณภาพและการออกแบบโค้ด TypeScript ของคุณ ผมจะเผยแพร่หนังสือที่ Leanpub ผมจะอัปเดตความคืบหน้าใน X (Twitter) โปรดติดตามผมที่ X (Twitter) [@mildronize](https://x.com/mildronize) ผมได้ทำงานกับหนังสือเล่มนี้มาสักพักแล้ว และหวังว่าจะเสร็จเร็วๆ นี้ ผมอยากได้ยินความคิดเห็นจากชุมชน เพราะในเวลานี้ที่ผมเขียนอยู่ ผมยังไม่เห็นใครเขียนเกี่ยวกับเรื่องนี้เลย

## สารบัญ

- การตั้งค่า TypeScript
  - ใช้ strict
- โครงสร้างข้อมูล
  - ใช้ [literal type](/data-structure/literal-types) แทน string
  - ใช้ [Record object](/data-structure/record-object.md) แทน list/array
  - ใช้ [Tuple](/data-structure/tuple.md) แทน list/array
- รูปแบบการออกแบบ
  - ใช้ [builder pattern](/design-patterns/builder-pattern.md)
  - ใช้ [function argument](/design-patterns/function-argument.md) แทน plain object
  - ใช้ [function overload](/design-patterns/function-overload.md)

## ข้อกำหนดเบื้องต้น
โปรดแน่ใจว่าคุณมีความเข้าใจใน TypeScript ดีพอก่อนที่จะอ่านหนังสือเล่มนี้ ถ้าคุณเป็นผู้เริ่มต้นแนะนำให้อ่าน [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) ก่อน

Generics เป็นแนวคิดพื้นฐานใน TypeScript ดังนั้นโปรดแน่ใจว่าคุณเข้าใจมันดี คุณสามารถอ่านส่วน [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) ของ TypeScript Handbook ได้

## การอ่านแนะนำ

- [Type-Level Programming](https://type-level-typescript.com/) e-book 
มีหลายบทที่สามารถอ่านได้ฟรี อย่างไรก็ตาม ผมแนะนำให้ซื้อหนังสือเพื่อสนับสนุนผู้เขียน ดูเพิ่มเติมที่ [YouTube](https://www.youtube.com/watch?v=vGVvJuazs84) และ [slide](https://docs.google.com/presentation/d/18Y0M4SRjKoJGR3ePSBBn8yPlpkE5biufZRdHo1Ka2AI/edit?usp=sharin) ของเขา
- [Effective TypeScript: 62 Specific Ways to Improve Your TypeScript](https://learning.oreilly.com/library/view/effective-typescript/9781098155056/) โดย Dan Vanderkam
- [TypeScript Cookbook](https://learning.oreilly.com/library/view/typescript-cookbook/9781098136642/) โดย Stefan Baumgartner

## ข้อสงวนสิทธิ์

ผมไม่ได้สร้างรูปแบบการออกแบบเหล่านี้ขึ้นมาเอง ผมเรียนรู้จากโปรเจกต์โอเพ่นซอร์ส TypeScript สมัยใหม่หลายโปรเจกต์ รวมถึงโปรเจกต์ที่มีชื่อเสียงเช่น Zod, tRPC, Hono, Elysia และอื่นๆ อีกมากมาย รวมถึงการเขียน [Nammtham](https://nammatham.thaitype.dev/) (Azure Functions Framework) การทำงานนี้ช่วยให้ผมกลั่นกรองรูปแบบที่ใช้บ่อยออกมาได้

รูปแบบการออกแบบที่เป็น Type-safe อาจไม่เหมาะกับทุกโปรเจกต์ มีไว้สำหรับโปรเจกต์ที่ต้องการคุณภาพโค้ดและการออกแบบสูง โปรดแน่ใจว่าประเมินว่ารูปแบบเหล่านี้เหมาะกับโปรเจกต์ของคุณหรือไม่ก่อนนำไปใช้

## การมีส่วนร่วม
ถ้าคุณมีข้อเสนอแนะหรือความคิดเห็นใดๆ โปรดอย่าลังเลที่จะส่ง pull request ที่ [GitHub](https://github.com/mildronize/type-safe-design-pattern)