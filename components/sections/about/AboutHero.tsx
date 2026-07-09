import Image from 'next/image';

const AboutHero = () => {
  return (
    <section className="bg-white pt-12 pb-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-6">
        {/* Badge */}
        <span className="bg-white border-2 border-[#F97316] text-[#F97316] py-1.5 px-5 rounded-full text-[13px] font-semibold tracking-wide">
          MENGENAL LEBIH DEKAT
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-fredoka)] leading-tight">
          <span className="text-[#0F766E]">Cerita Di Balik</span>{' '}
          <span className="text-[#F97316]">Circle Pintar</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#71717A] max-w-2xl text-[15px] md:text-[16px] leading-relaxed mb-8">
          Kami hadir mengubah proses belajar yang kaku menjadi petualangan digital yang seru, 
          kreatif, dan menyenangkan bagi setiap siswa.
        </p>

        {/* Illustration */}
        <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden relative">
          <Image
            src="/hero-section-about.png"
            alt="Cerita di balik Circle Pintar"
            width={1000}
            height={500}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
