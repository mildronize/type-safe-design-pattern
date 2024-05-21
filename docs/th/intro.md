---
outline: deep
---

# บทนำ

::: warning คำเตือน
ตอนนี้ยังไม่ได้เขียนแปลไทยไว้ แต่สามารถอ่านแบบภาษาอังกฤษได้ก่อน และรอให้เขียนเสร็จแล้วจะมาแปลเป็นภาษาไทยต่อ และบางหน้าทดลองแปลด้วย AI ไว้บ้าง ถ้าคำที่เขียนไม่สละสลวย สามารถช่วยแก้ไขได้

โดยที่ภาษาอังกฤษจะเป็น Single Source of Truth, และจะไม่มีการใส่เนื้อหาเพิ่มในส่วนของภาษาไทย แต่จะเป็นการแปลมาเท่านั้น โดยภาษาไทยผมได้เตรียม Template ไว้แล้วสามารถ copy เนื้อหาภาษาอังกฤษ และสามารถเปิด Issue หรือส่ง Pull Request ได้ที่ [GitHub](https://github.com/mildronize/type-safe-design-pattern)
:::

::: info ข้อมูล
หนังสือเล่มนี้มีความซับซ้อนมากกว่าคู่มือ TypeScript ซึ่งเหมาะสำหรับนักพัฒนาที่มีความรู้ใน TypeScript อยู่แล้ว และต้องการปรับปรุงคุณภาพและการออกแบบโค้ดของตัวเอง
:::

หนังสือเล่มนี้เป็นการรวบรวมแนวปฏิบัติที่ดีนำไปใช้งานได้จริงและแนวทางการออกแบบใน TypeScript ซึ่งตั้งใจให้เป็นคู่มือสำหรับนักพัฒนาที่ต้องการปรับปรุงคุณภาพและการออกแบบโค้ด TypeScript หนังสือครอบคลุมหัวข้อต่าง ๆ อย่างกว้างขวาง รวมถึงการตั้งค่า TypeScript, โครงสร้างข้อมูล, แนวทางการออกแบบ และอื่น ๆ

หลังจากที่ได้ตรวจสอบโค้ดของโครงการโอเพนซอร์สที่มีชื่อเสียงหลายโครงการ เช่น Zod, tRPC, Hono, Elysia, และ ts-odata-client

## พูดคุยกับผู้เขียน

ผมกำลังเขียน E-book เล่มใหม่ โปรดติดตามและสนับสนุน! หนังสือเล่มนี้สำหรับผู้ใช้ TypeScript ขั้นสูง (ไม่เหมาะสำหรับผู้เริ่มต้น อาจจะซับซ้อนเกินไป) ชื่อของหนังสือคือ **"การออกแบบชนิดข้อมูลแบบปลอดภัยใน TypeScript สมัยใหม่"** ไม่ใช่ทุกแนวทางการออกแบบสามารถทำให้ชนิดข้อมูลแบบปลอดภัยได้ แต่ผมได้รวบรวมแนวทางการออกแบบที่ใช้งานบ่อยในห้องสมุด TypeScript สมัยใหม่

นอกจากนี้ผมยังไม่เคยเห็นหนังสือหรือบทความที่ครอบคลุมหัวข้อเหล่านี้ ผมหวังว่าหนังสือเล่มนี้จะช่วยปรับปรุงคุณภาพและการออกแบบโค้ด TypeScript ของคุณ ผมจะเผยแพร่หนังสือบน Leanpub และจะอัปเดตความคืบหน้าบน X (Twitter) โปรดติดตามผมบน X (Twitter) [@mildronize](https://x.com/mildronize) ผมทำงานกับหนังสือเล่มนี้มาระยะหนึ่งแล้วและหวังว่าจะเสร็จในเร็ว ๆ นี้ ผมอยากได้ยินความคิดเห็นจากชุมชนเพราะตอนที่ผมเขียนยังไม่เห็นมีใครเขียนเกี่ยวกับเรื่องนี้เลย

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

## สิ่งที่ควรเรียนรู้มาก่อน

โปรดแน่ใจว่าคุณมีความเข้าใจที่ดีเกี่ยวกับ TypeScript ก่อนอ่านหนังสือเล่มนี้ หากคุณยังใหม่กับ TypeScript ผมแนะนำให้อ่าน [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html) ก่อน

Generics เป็นแนวคิดพื้นฐานใน TypeScript ดังนั้นโปรดแน่ใจว่าคุณเข้าใจ คุณสามารถอ่านส่วนของ [Generics](https://www.typescriptlang.org/docs/handbook/2/generics.html) ใน TypeScript Handbook

## หนังสือและเอกสารที่แนะนำให้อ่าน

- [Type-Level Programming](https://type-level-typescript.com/) e-book
มีหลายบทที่เปิดให้อ่านฟรี อย่างไรก็ตามผมแนะนำให้ซื้อหนังสือเพื่อสนับสนุนผู้เขียน ดูเพิ่มเติมใน [YouTube](https://www.youtube.com/watch?v=vGVvJuazs84) และ [slide](https://docs.google.com/presentation/d/18Y0M4SRjKoJGR3ePSBBn8yPlpkE5biufZRdHo1Ka2AI/edit?usp=sharin) ของเขา
- [Effective TypeScript: 62 Specific Ways to Improve Your TypeScript](https://learning.oreilly.com/library/view/effective-typescript/9781098155056/) โดย Dan Vanderkam
- [TypeScript Cookbook](https://learning.oreilly.com/library/view/typescript-cookbook/9781098136642/) โดย Stefan Baumgartner

## คำชี้แจงที่สำคัญ

ผมไม่ได้สร้างแนวทางการออกแบบเหล่านี้ ผมเรียนรู้จากโครงการโอเพนซอร์ส TypeScript สมัยใหม่หลายโครงการ รวมถึงโครงการที่มีชื่อเสียงเช่น Zod, tRPC, Hono, Elysia, และอื่น ๆ รวมถึงการเขียน [Nammtham](https://nammatham.thaitype.dev/) (Azure Functions Framework) กระบวนการนี้ช่วยให้ผมกลั่นกรองแนวทางการออกแบบที่ใช้บ่อย

การออกแบบชนิดข้อมูลแบบปลอดภัยไม่เหมาะกับทุกโครงการ มันเหมาะกับโครงการที่ต้องการคุณภาพและการออกแบบโค้ดที่สูง โปรดประเมินว่าแนวทางการออกแบบเหล่านี้เหมาะสมกับโครงการของคุณหรือไม่ก่อนนำไปใช้

## การมีส่วนร่วม (Contributing)

ถ้าคุณมีข้อเสนอแนะหรือความคิดเห็น โปรดเปิด Issue หรือส่ง Pull Request บน [GitHub](https://github.com/mildronize/type-safe-design-pattern) ได้ตามสบาย

คุณสามารถมีส่วนร่วมทั้งในด้านเนื้อหาและการแปล:

- **การมีส่วนร่วมในเนื้อหา** (Content Contribution) คุณสามารถมีส่วนร่วมโดยการเพิ่มแนวทางการออกแบบ (Design Patterns) ใหม่ ๆ แนวปฏิบัติที่ดีนำไปใช้งานได้จริง (Best Practices) หรือปรับปรุงเนื้อหาที่มีอยู่ ซึ่งทำได้เฉพาะในเวอร์ชันภาษาอังกฤษเท่านั้น
- **การมีส่วนร่วมในการแปล** (Translation Contribution) คุณสามารถมีส่วนร่วมโดยการแปลเนื้อหาเป็นภาษาของคุณ ผมแนะนำให้ใช้การสร้างเนื้อหาจาก AI เช่น GPT-3, GPT-4 เป็นต้น เพื่อสร้างเนื้อหาสำหรับหน้า คุณสามารถดูตัวอย่างได้ในหน้าของ [Prompt](./prompt.md)
    - เพื่อความสม่ำเสมอ โปรดอย่าแปลเนื้อหาโดยตรง แต่ใช้ prompt เพื่อสร้างเนื้อหา เมื่อผลลัพธ์ของ prompt ไม่ดี คุณสามารถปรับปรุงเงื่อนไขของ prompt และลองใหม่ได้ คุณสามารถดูตัวอย่างได้ในหน้าของ [Thai Prompt](/th/prompt.md)
    - เมื่อคุณคัดลอกผลลัพธ์จาก ChatGPT ผมแนะนำให้วางในโปรแกรม WSYSIWYG editor อย่าง [Typora](https://typora.io/) หรือ Notion เพื่อดูตัวอย่างการแสดงผล markdown จากนั้นคุณสามารถคัดลอกเนื้อหา markdown และวางลงในหน้าได้