"use client";
import Link from 'next/link';
import { useLanguage } from './LanguageContext';

export default function OverviewPage() {
  const { language } = useLanguage();

  if (language === 'th') {
    return (
      <div style={{ color: 'var(--text-secondary)' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: 'bold' }}>ภาพรวม Autobot</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
          แพลตฟอร์มหุ่นยนต์เพื่อการศึกษาสำหรับระบบ Kinematics และปัญญาประดิษฐ์ (AI)
        </p>

        <hr style={{ borderColor: 'var(--border-color)', margin: '30px 0' }} />

        <section>
          <h2 style={{ color: '#38bdf8' }}>บทนำ</h2>
          <p style={{ lineHeight: '1.8' }}>
            โครงการ Autobot ถูกออกแบบมาเพื่อเป็นเฟรมเวิร์กและแพลตฟอร์มการเรียนรู้สำหรับนักเรียนและนักพัฒนา
            ในการสร้างและควบคุมหุ่นยนต์เคลื่อนที่ (Mobile Robot) โดยใช้ไมโครคอนโทรลเลอร์ (ESP32)
            ร่วมกับบอร์ดประมวลผลสำหรับงาน AI (Raspberry Pi) ระบบถูกออกแบบให้มีความยืดหยุ่นสูง
            รองรับรูปแบบการขับเคลื่อนหลายรูปแบบ (2 ล้อ, 3 ล้อ, 4 ล้อ, ล้อออมนิ, ล้อแมคคานัม)
          </p>
        </section>

        <section style={{ marginTop: '30px' }}>
          <h2 style={{ color: '#38bdf8' }}>ลิงก์ด่วน (Quick Links)</h2>
          <ul style={{ lineHeight: '1.8' }}>
            <li><Link href="/docs/hardware_th" style={{ color: '#facc15' }}>ส่วนประกอบฮาร์ดแวร์และการประกอบ (Hardware & Assembly)</Link></li>
            <li><Link href="/docs/feature/spec_th" style={{ color: '#facc15' }}>ข้อมูลจำเพาะทางเทคนิค (Technical Specifications)</Link></li>
            <li><Link href="/docs/feature/component_th" style={{ color: '#facc15' }}>รายการส่วนประกอบ (Component List)</Link></li>
            <li><Link href="/docs/software" style={{ color: '#facc15' }}>เริ่มต้นใช้งานโค้ดดิ้งแบบบล็อก (Blockly Code)</Link></li>
            <li><Link href="/docs/ai/usage_th" style={{ color: '#facc15' }}>เริ่มต้นใช้งานระบบ AI (Getting Started with AI)</Link></li>
          </ul>
        </section>
      </div>
    );
  }

  return (
    <div style={{ color: 'var(--text-secondary)' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: 'bold' }}>Autobot Overview</h1>
      <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginTop: '10px' }}>
        Educational robotics platform for Kinematics and AI.
      </p>

      <hr style={{ borderColor: 'var(--border-color)', margin: '30px 0' }} />

      <section>
        <h2 style={{ color: '#38bdf8' }}>Introduction</h2>
        <p style={{ lineHeight: '1.8' }}>
          The Autobot project is designed to provide students and developers with a robust learning
          platform and framework for building and controlling mobile robots. It leverages Arduino-based
          microcontrollers (ESP32) alongside AI coprocessors (Raspberry Pi). The system is highly flexible,
          supporting multiple drive configurations including 2-wheel, 3-wheel, 4-wheel, omni-wheel,
          and mecanum wheel setups.
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#38bdf8' }}>Quick Links</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><Link href="/docs/hardware" style={{ color: '#facc15' }}>Hardware & Assembly</Link></li>
          <li><Link href="/docs/feature/spec" style={{ color: '#facc15' }}>Technical Specifications</Link></li>
          <li><Link href="/docs/feature/component" style={{ color: '#facc15' }}>Component List</Link></li>
          <li><Link href="/docs/software" style={{ color: '#facc15' }}>Getting Started with Blockly</Link></li>
          <li><Link href="/docs/ai/usage" style={{ color: '#facc15' }}>Getting Started with AI</Link></li>
        </ul>
      </section>
    </div>
  );
}
