const AboutVisionMission = () => {
  return (
    <section className="bg-[#f8fffe] pt-10 pb-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
          <span className="bg-white border-2 border-[#F97316] text-[#F97316] py-1.5 px-5 rounded-full text-[13px] font-semibold tracking-wide">
            VISI DAN MISI KAMI
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold font-[family-name:var(--font-fredoka)] leading-tight">
            <span className="text-[#0F766E]">Fokus </span>
            <span className="text-[#F97316]">dan </span>
            <span className="text-[#0F766E]">Tujuan Utama </span>
            <span className="text-[#F97316]">Circle Pintar</span>
          </h2>
          <p className="text-[#71717A] text-[15px] leading-relaxed">
            Menjadi platform pembelajaran interaktif nomor satu di Indonesia yang mengubah proses belajar mandiri menjadi sebuah petualangan digital yang seru, kreatif, dan menyenangkan bagi generasi masa depan.
          </p>
        </div>

        {/* Content Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 relative">
          
          {/* Divider Line (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-[#0F766E]/30 transform -translate-x-1/2"></div>

          {/* Visi */}
          <div className="flex flex-col items-center text-center gap-6 lg:pr-16 w-full">
            <h3 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">Visi</h3>
            <div className="bg-[#1BAA8A] rounded-[32px] p-8 md:p-10 shadow-lg text-white text-[15px] leading-relaxed h-full flex items-center justify-center text-center w-full">
              Menjadi platform pembelajaran interaktif nomor satu di Indonesia yang mengubah proses belajar mandiri menjadi sebuah petualangan digital yang seru, kreatif, dan menyenangkan bagi generasi masa depan.
            </div>
          </div>

          {/* Misi */}
          <div className="flex flex-col items-center text-center gap-6 lg:pl-16 w-full">
            <h3 className="text-3xl font-bold font-[family-name:var(--font-fredoka)] text-[#0F766E]">Misi</h3>
            <div className="flex flex-col gap-4 w-full">
              {[
                { 
                  no: '#1', 
                  title: 'Akses Mudah & Fleksibel', 
                  desc: 'Menyediakan pembelajaran yang bisa diakses di mana saja dan kapan saja.' 
                },
                { 
                  no: '#2', 
                  title: 'Visual Interaktif', 
                  desc: 'Materi dikemas dengan UI/UX yang modern, menyenangkan, dan tidak kaku.' 
                },
                { 
                  no: '#3', 
                  title: 'Evaluasi Transparan', 
                  desc: 'Menyediakan bank soal interaktif dengan pembahasan yang terperinci.' 
                },
              ].map((misi, index) => (
                <div key={index} className="bg-[#1BAA8A] rounded-[24px] md:rounded-full p-2 pr-4 md:pr-6 flex items-center gap-4 text-white shadow-md w-full overflow-hidden">
                  {/* Number Circle */}
                  <div className="bg-white border-2 border-[#F97316] text-[#F97316] w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    {misi.no}
                  </div>
                  {/* Text */}
                  <div className="flex flex-col py-1 flex-1 min-w-0 text-left">
                    <span className="font-semibold text-[14px] md:text-[15px] whitespace-normal break-words">{misi.title}</span>
                    <span className="text-[12px] opacity-90 whitespace-normal break-words">{misi.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutVisionMission;
