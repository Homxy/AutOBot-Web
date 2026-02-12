// app/(dashboard)/docs/page.tsx
import Link from 'next/link'; // Add this line

export default function OverviewPage() {
  return (
    <div>
      <h1 style={{ color: '#ffffff', fontSize: '2.5rem', fontWeight: 'bold' }}>Autobot Library Overview</h1>
      <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginTop: '10px' }}>
        Educational robotics platform for AI and Kinematics.
      </p>
      
      <hr style={{ borderColor: '#334155', margin: '30px 0' }} />
      
      <section>
        <h2 style={{ color: '#38bdf8' }}>Introduction</h2>
        <p>
          The Autobot Library is designed to provide students and developers with a robust 
          framework for controlling mobile robots using Arduino-based controllers (ESP32) 
          and AI coprocessors (Raspberry Pi).
        </p>
      </section>

      <section style={{ marginTop: '30px' }}>
        <h2 style={{ color: '#38bdf8' }}>Quick Links</h2>
        <ul style={{ lineHeight: '1.8' }}>
          <li><Link href="/docs/feature/spec" style={{ color: '#facc15' }}>Technical Specifications</Link></li>
          <li><Link href="/docs/software" style={{ color: '#facc15' }}>Getting Started with Blockly Code</Link></li>
          <li><Link href="/docs/ai/usage" style={{ color: '#facc15' }}>Getting Started with AI</Link></li>
        </ul>
      </section>
    </div>
  );
}
