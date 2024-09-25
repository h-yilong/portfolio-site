import Hero from '@/app/ui/home/Hero';
import { preload } from 'react-dom';

export default function Home() {
  preload('/assets/images/js.svg', { as: 'image' });
  preload('/assets/images/nodejs.svg', { as: 'image' });
  preload('/assets/images/react.svg', { as: 'image' });
  preload('/assets/images/base.jpg', { as: 'image' });
  preload('/assets/images/1.jpg', { as: 'image' });
  preload('/assets/images/2.jpg', { as: 'image' });

  return (
    <main className="max-w-7xl mx-auto relative">
      <Hero />
    </main>
  );
}
