const AboutValues = () => {
  const values = [
    {
      title: 'Bersahabat & Playful',
      desc: 'Kami merancang antarmuka dan penyampaian materi dengan pendekatan yang kasual agar siswa merasa nyaman seperti sedang belajar bersama teman sendiri.',
    },
    {
      title: 'Terstruktur & Terarah',
      desc: 'Setiap modul materi disusun secara rapi dan runut berdasarkan tingkat kelas agar proses penyerapan ilmu menjadi jauh lebih efisien.',
    },
    {
      title: 'Memotivasi',
      desc: 'Kami percaya bahwa apresiasi kecil melalui sistem poin, XP, dan progress bar yang jelas dapat menjaga semangat belajar siswa tetap membara.',
    },
  ];

  return (
    <section className="bg-white py-20 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Header */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left gap-6 max-w-2xl mx-auto md:mx-0 w-full">
          <span className="bg-white border-2 border-[#F97316] text-[#F97316] py-1.5 px-5 rounded-full text-[13px] font-semibold tracking-wide">
            NILAI UTAMA KAMI
          </span>
          <h2 className="text-3xl md:text-[40px] font-bold font-[family-name:var(--font-fredoka)] leading-tight">
            <span className="text-[#0F766E]">Nilai </span>
            <span className="text-[#F97316]">Yang Kami </span>
            <span className="text-[#F97316]">Pegang </span>
            <span className="text-[#0F766E]">Teguh</span>
          </h2>
          <p className="text-[#71717A] text-[15px] leading-relaxed">
            Menjadi platform belajar interaktif nomor satu yang mengubah proses belajar menjadi petualangan digital menyenangkan.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <div 
              key={index} 
              className="bg-[#1BAA8A] rounded-[32px] p-8 flex flex-col items-start gap-6 shadow-lg transition-transform hover:-translate-y-2 duration-300"
            >
              <div className="bg-[#FFF7ED] text-[#F97316] font-bold text-[14px] px-6 py-2 rounded-full shadow-sm">
                {value.title}
              </div>
              <p className="text-white text-[15px] leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
