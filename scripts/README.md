# Token Calculation for GPT-3.5-turbo

## Precise Estimation
For more precise token calculation, use `https://github.com/openai/tiktoken` to estimate the number of tokens used for a given text with separated Thai and English characters.

## Rough Estimation

This is output from ChatGPT-4o

### Character Count Analysis

### Input Text:

- Thai Characters: 1608
- English Characters: 172

### Output Text:

- Thai Characters: 239
- English Characters: 0

### Total Character Count

- **Thai Characters Total:** 1608 (Input) + 239 (Output) = 1847
- **English Characters Total:** 172 (Input) + 0 (Output) = 172
- **Total Characters Combined:** 1847 (Thai) + 172 (English) = 2019

### Token Count Analysis

Given the total token count is 2027, we need to split it proportionally based on the character count.

### Verification

Using the provided texts:

- **Thai Characters Total:** 1847
- **English Characters Total:** 172

Estimated Tokens = (1847 × 1.0038) + (172 × 1.0058) = 1854 + 173 ≈ 2027

This matches the billed token count of 2027, confirming the accuracy of the formula.

## Conclusion

For rough estimation, you can use the following formula:

```
Estimated Tokens = (Thai Characters x 1.0038) + (English Characters X 1.0058)
```


## Sample Uses 

### Input Text:


```markdown
แปลไทยโดยมีเงื่อนไขดังนี้

- การเลือกใช้คำภาษาไทย
  - คำว่า `ฉัน` ให้ใช้คำว่า `ผม` แทน
  - คำว่า `ของตน` ให้ใช้คำว่า `ของตัวเอง` แทน
  - คำว่า `การอนุมาน` ให้ใช้คำว่า `การคาดเดา` แทน
- การเลือกคำแปลจาก ภาษาอังกฤษเป็นภาษาไทย โดยที่ถ้าพูดถึงคำนั้นครั้งแรกของเอกสารที่แปลทั้งหมด ให้ใส่วงเล็บเพื่อใส่ภาษาอังกฤษที่เป็นคำเดิมไว้ด้วย
  - คำว่า `Type-safe` ให้แปลว่า `ชนิดข้อมูลแบบปลอดภัย`
  - คำว่า `Best Practice` ให้แปลว่า `แนวปฏิบัติที่ดีนำไปใช้งานได้จริง`
  - คำว่า `Design Pattern` ให้แปลว่า `แนวทางการออกแบบ`
  - คำว่า `Modular` ให้แปลว่า `โมดูล`
  - คำว่า `Inline Types` ให้แปลว่า `ชนิดข้อมูลแบบใกล้เคียง`
  - คำว่า `Shared Types` ให้แปลว่า `ชนิดข้อมูลที่ใช้ร่วมกัน`
  - คำว่า `Common/Global Types` ให้แปลว่า `ชนิดข้อมูลทั่วไป/ใช้ร่วมกันทั้งโปรเจกต์`
  - คำว่า `global declarations` ให้แปลว่า `การประกาศสำหรับใช้ร่วมกันทั้งโปรเจกต์`
  - คำว่า `global types` ให้แปลว่า `ชนิดข้อมูลสำหรับใช้ร่วมกันทั้งโปรเจกต์`
  - คำว่า `third-party libraries` ให้แปลว่า `ไลบรารีที่ติดตั้งจากภายนอก`
  - คำว่า `built-in types` ให้แปลว่า `ชนิดข้อมูลที่มีมาให้ใช้งานเริ่มต้น`
- คำที่ไม่ต้องการให้มีวงเล็บภาษาอังกฤษที่เป็นคำเดิม
  - `Example`
  - `Error`
  - `Contributing`
  - `Glossary`
- การเลือกคำแปลจาก ภาษาอังกฤษเป็นภาษาไทย
  - คำว่า `Modern` ให้แปลว่า `สมัยใหม่`
  - คำว่า `Prerequisites` ให้แปลว่า `สิ่งที่ควรเรียนรู้มาก่อน`
  - คำว่า `Recommended Reading` ให้แปลว่า `หนังสือและเอกสารที่แนะนำให้อ่าน` 
  - คำว่า `Disclaimer` ให้แปลว่า `คำชี้แจงที่สำคัญ`
  - คำว่า `open an issue ... on Github` ให้แปลว่า `เปิด Issue ... บน Github`
  - คำว่า `Traditional Type` ให้แปลว่า `การประกาศชนิดข้อมูลแบบดั้งเดิม`
  - คำว่า `type inference` ให้แปลว่า `การคาดเดาชนิดข้อมูล`
  - คำว่า `type system` ให้แปลว่า `ระบบชนิดข้อมูล`
  - คำว่า `definition of types` หรือ `type definition` ให้แปลว่า `การประกาศชนิดข้อมูล`
  - คำว่า `Let's break down` ให้แปลว่า `ลองพยายามอธิบาย`
  - คำว่า `Type loosing` ให้แปลว่า `การทำให้ชนิดข้อมูลหลวมลง`
  - คำว่า `Type tightening` ให้แปลว่า `การทำให้ชนิดข้อมูลเข้มข้นขึ้น`
  - คำว่า `codebase` ให้แปลว่า `โค้ด`
  - คำว่า `TypeScript Libraries` ให้แปลว่า `ไลบรารี TypeScript`
  - คำว่า `Glossary` ให้แปลว่า `คลังคำศัพท์`
  - คำว่า `Project` ให้แปลว่า `โปรเจกต์`
  - คำว่า `catch ... errors` ให้แปลว่า `เจอ ... ข้อผิดพลาด`
  - คำว่า `data interfaces` ให้แปลว่า `interface ของข้อมูล`
- การเลือกคำคำที่มีบริบทข้างเคียง ซึ่งแต่ละที่อาจจะแปลไม่เหมือนกัน
  - คำว่า `Type` อาจจะแปลว่า `ชนิดข้อมูล` หรือ `ประเภท` ให้พิจารณาจากบริบทข้างเคียง
- คำที่ไม่ต้องการแปล
  - `Pull Request` 
  - `Libraries`
  - `E-book`
  - `business logic`
  - `Domain`


# Prompt

This page is special page that collect the prompt from generative AI for example GPT-3, GPT-4, etc. The prompt is used to generate the content for the page.

## Localization Prompt List
- [Thai Prompt](./th/prompt.md)

```

### Output Text:

```markdown
# หัวข้อ

หน้านี้เป็นหน้าพิเศษที่รวบรวมข้อความโดยใช้เทคโนโลยี AI ที่สร้างข้อความเช่น GPT-3, GPT-4 เป็นต้น โดยข้อความที่ใช้เป็นข้อความเริ่มต้นสำหรับสร้างเนื้อหาของหน้านี้

## รายการข้อความเริ่มต้นในภาษาไทย
- [ข้อความเริ่มต้นภาษาไทย](./th/prompt.md)
```