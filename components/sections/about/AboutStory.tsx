import Image from 'next/image';

const AboutStory = () => {
  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Left: Illustration */}
        <div className="flex justify-center w-full">
          <div className="relative w-full max-w-[450px]">
            <Image
              src="/about-section.png"
              alt="Bagaimana semua ini dimulai"
              width={500}
              height={500}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6 w-full px-2 sm:px-0">
          {/* Badge */}
          <span className="bg-white border-2 border-[#F97316] text-[#F97316] py-1.5 px-5 rounded-full text-[13px] font-semibold tracking-wide w-fit">
            TENTANG CIRCLE PINTAR
          </span>

          {/* Heading */}
          <h2 className="text-[32px] md:text-[40px] font-bold font-[family-name:var(--font-fredoka)] leading-tight">
            <span className="text-[#0F766E]">Bagaimana</span>{' '}
            <span className="text-[#F97316]">Semua Ini</span>{' '}
            <span className="text-[#F97316]">Dimulai</span>
          </h2>

          {/* Paragraphs */}
          <div className="flex flex-col gap-4 text-[#71717A] text-[15px] leading-relaxed w-full break-words text-justify">
            <p>
              Circle Pintar lahir dari sebuah keresahan yang sering dihadapi pelajar: materi sekolah yang terlalu menumpuk, membosankan, dan sistem belajar yang kaku. Banyak siswa kehilangan motivasi bukan karena mereka tidak mampu, melainkan karena belum menemukan media belajar yang tepat.
            </p>
            <p>
              Berangkat dari sana, kami tergerak untuk membangun sebuah lingkaran belajar digital yang adaptif. Kami mengintegrasikan kurikulum referensi nasional dengan pengalaman visual yang interaktif. Di Circle Pintar, kami tidak hanya berfokus pada hasil akhir berupa nilai akademis, tetapi juga berkomitmen penuh untuk merawat rasa ingin tahu dan konsistensi belajar siswa di sepanjang perjalanan mereka.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
