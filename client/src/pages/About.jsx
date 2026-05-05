import React from "react";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  Compass,
  Eye,
  Facebook,
  Flag,
  Instagram,
  Leaf,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Target,
  Users,
  Wrench,
  Youtube,
  Lightbulb,
  Sparkles,
  Zap,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
  const values = [
    { title: "Education-first", text: "We simplify complex EV topics.", icon: GraduationIcon },
    { title: "User-first", text: "Your journey, your needs.", icon: Users },
    { title: "Transparency", text: "Honest, unbiased, and reliable information.", icon: ShieldCheck },
    { title: "Sustainability", text: "For a cleaner planet.", icon: Leaf },
    { title: "Innovation", text: "Continuous learning and improvement.", icon: Lightbulb },
  ];

  const workItems = [
    "Clear EV explanations for beginners and enthusiasts.",
    "Practical tools for charging, trip planning, and battery care.",
    "EV battery health prediction and RUL estimation support.",
    "Smart EV guides for better ownership decisions.",
    "Trusted, simple, and independent EV information.",
  ];

  const team = [
    {
      name: "VoltIQ Research Team",
      role: "EV Battery Intelligence",
      text: "Focused on battery health, charging behavior, and EV data-driven insights.",
      icon: Zap,
    },
    {
      name: "Product Design Team",
      role: "UI/UX Experience",
      text: "Designs simple, futuristic, and user-friendly EV learning experiences.",
      icon: Compass,
    },
    {
      name: "Engineering Team",
      role: "Full Stack Development",
      text: "Builds scalable React, FastAPI, and PostgreSQL based EV tools.",
      icon: Wrench,
    },
    {
      name: "Content Team",
      role: "EV Education",
      text: "Creates beginner-friendly EV guides, charging tips, and ownership content.",
      icon: GraduationIcon,
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] font-sans text-white selection:bg-cyan-500/30">
      <Navbar />

      <main className="overflow-hidden">
        {/* HERO */}
        <section className="relative min-h-[92vh] pt-28">
          <div className="absolute inset-0">
            <img
              src="/src/assets/evstation.png"
              alt="EV charging station"
              className="h-full w-full object-cover opacity-40"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050816] via-[#050816]/90 to-[#050816]/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-[#050816]/80" />
            <div className="absolute left-0 top-24 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[160px]" />
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[160px]" />
          </div>

          <div className="relative z-10 mx-auto grid min-h-[78vh] max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.95fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-black uppercase tracking-[0.25em] text-cyan-300 shadow-[0_0_35px_rgba(34,211,238,0.12)]">
                <Sparkles className="h-4 w-4" />
                About VoltIQ
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tighter md:text-7xl">
                About
                <span className="block bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-300 bg-clip-text text-transparent">
                  VoltIQ
                </span>
              </h1>

              <p className="mt-8 max-w-2xl border-l-4 border-cyan-400 pl-5 text-lg leading-8 text-cyan-50/80 md:text-2xl">
                We’re building smarter tools to help drivers understand, buy,
                charge, maintain, and own electric vehicles with confidence.
              </p>

              <div className="mt-10 grid max-w-xl gap-5 sm:grid-cols-2">
                <HeroMiniCard
                  icon={Leaf}
                  title="Cleaner Future"
                  text="Lower emissions for a smarter planet."
                />
                <HeroMiniCard
                  icon={Wrench}
                  title="Smarter Mobility"
                  text="Better EV choices for every driver."
                />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-8 rounded-full bg-cyan-400/20 blur-[90px]" />
              <div className="relative overflow-hidden rounded-[2.5rem] border border-cyan-400/20 bg-white/[0.06] p-5 shadow-[0_0_70px_rgba(34,211,238,0.16)] backdrop-blur-2xl">
                <img
                  src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=1200&q=80"
                  alt="EV charging"
                  className="h-[420px] w-full rounded-[2rem] object-cover"
                />
                <div className="absolute bottom-10 left-10 rounded-2xl border border-white/10 bg-[#050816]/80 p-6 backdrop-blur-xl">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-300">
                    Mission
                  </p>
                  <p className="mt-2 text-3xl font-black">
                    Drive Electric. <br /> Drive Smart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="relative px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2.5rem] border border-white/10 bg-white/[0.05] p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)] backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr] md:p-12">
            <div className="flex gap-8">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Flag className="h-12 w-12" />
              </div>

              <div>
                <h2 className="mb-6 text-4xl font-black uppercase tracking-tight">
                  Our Story
                </h2>

                <div className="space-y-5 text-base leading-8 text-slate-400">
                  <p>
                    VoltIQ was created with a simple idea: EV information should
                    be clear, practical, and easy to use.
                  </p>
                  <p>
                    Many drivers want to understand charging, battery health,
                    range, maintenance, and EV ownership, but the information is
                    often scattered or too technical.
                  </p>
                  <p>
                    VoltIQ brings EV learning, battery intelligence, charging
                    guidance, and smart tools into one modern web application.
                  </p>
                  <p>
                    Our goal is to support a cleaner and smarter electric
                    mobility future.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full max-w-md rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-10">
                <div className="mb-8 text-7xl font-black text-cyan-300">“</div>
                <p className="text-3xl font-black leading-tight">
                  The best way to predict the future is to drive it.
                </p>
                <p className="mt-8 text-lg font-bold text-cyan-300">
                  — VoltIQ Vision
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="relative px-6 py-24">
          <SectionTitle
            eyebrow="Purpose"
            title="Mission, Vision & Values"
            text="VoltIQ combines EV education, smart technology, and clean mobility thinking."
          />

          <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.8fr_0.8fr_1.8fr]">
            <InfoBox
              icon={Target}
              title="Mission"
              text="Help people understand EVs, make informed decisions, and own EVs more easily."
              color="text-cyan-300"
            />
            <InfoBox
              icon={Eye}
              title="Vision"
              text="A future where electric vehicles are smarter, cleaner, and easier for everyone."
              color="text-emerald-300"
            />

            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl">
              <h3 className="mb-6 text-2xl font-black uppercase">Our Values</h3>

              <div className="grid gap-6 md:grid-cols-2">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="flex gap-4">
                      <Icon className="h-8 w-8 shrink-0 text-cyan-300" />
                      <div>
                        <h4 className="font-black text-white">{value.title}</h4>
                        <p className="text-sm leading-6 text-slate-400">
                          {value.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* WHAT WE DO */}
        <section className="relative px-6 py-24">
          <SectionTitle
            eyebrow="Platform"
            title="What We Do"
            text="We provide EV-focused learning pages, battery tools, charging support, and ownership guidance."
          />

          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <div className="relative">
              <div className="absolute -inset-6 rounded-full bg-cyan-500/20 blur-[90px]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-white/[0.06] p-4 backdrop-blur-xl">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&q=80"
                  alt="EV smart dashboard"
                  className="h-80 w-full rounded-[1.5rem] object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-6 text-lg leading-8 text-slate-400">
                We support users at every step of the EV journey with practical,
                clear, and visually guided tools.
              </p>

              <div className="space-y-4">
                {workItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-base font-semibold text-slate-300"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="relative px-6 py-24">
          <SectionTitle
            eyebrow="People"
            title="Our Team"
            text="VoltIQ is designed around EV learning, software engineering, battery analytics, and user experience."
          />

          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
            {team.map((member) => {
              const Icon = member.icon;
              return (
                <div
                  key={member.name}
                  className="group rounded-3xl border border-white/10 bg-white/[0.05] p-7 text-center backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
                >
                  <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                    <Icon className="h-10 w-10" />
                  </div>

                  <h3 className="text-lg font-black text-white">
                    {member.name}
                  </h3>
                  <p className="mb-3 text-sm font-bold text-cyan-300">
                    {member.role}
                  </p>
                  <p className="text-sm leading-7 text-slate-400">
                    {member.text}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CONTACT */}
        <section className="relative px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-white/[0.04] to-emerald-500/10 p-8 backdrop-blur-xl md:p-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
                Contact
              </p>
              <h2 className="mb-5 text-4xl font-black uppercase tracking-tight">
                Let’s Connect
              </h2>
              <p className="mb-8 text-base leading-7 text-slate-400">
                Have questions, ideas, or want to collaborate? Contact the
                VoltIQ team.
              </p>

              <div className="space-y-4 text-base font-semibold text-slate-300">
                <ContactLine icon={Mail} text="hello@voltiq.lk" />
                <ContactLine icon={Phone} text="+94 77 123 4567" />
                <ContactLine icon={MapPin} text="Colombo, Sri Lanka" />
              </div>
            </div>

            <div>
              <h2 className="mb-5 text-4xl font-black uppercase tracking-tight">
                Follow Us
              </h2>
              <p className="mb-8 text-base leading-7 text-slate-400">
                Stay updated with EV news, battery guides, charging tips, and
                VoltIQ platform updates.
              </p>

              <div className="flex flex-wrap gap-4">
                <SocialIcon icon={Facebook} />
                <SocialIcon icon={Instagram} />
                <SocialIcon icon={Youtube} />
                <SocialIcon icon={Linkedin} />
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CARDS */}
        <section className="relative px-6 py-24">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
            <BottomCard
              icon={Leaf}
              title="Explore EV Tools"
              text="Use smart tools and calculators for your EV journey."
            />
            <BottomCard
              icon={Compass}
              title="Browse EV Guides"
              text="Learn about EVs, charging, batteries, and ownership."
            />
            <BottomCard
              icon={MessageCircle}
              title="Contact Us"
              text="We are here to support your electric mobility journey."
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const HeroMiniCard = ({ icon: Icon, title, text }) => (
  <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-xl">
    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
      <Icon className="h-7 w-7" />
    </div>
    <div>
      <h3 className="font-black text-cyan-300">{title}</h3>
      <p className="text-sm leading-6 text-slate-400">{text}</p>
    </div>
  </div>
);

const SectionTitle = ({ eyebrow, title, text }) => (
  <div className="mx-auto mb-14 max-w-7xl text-left">
    {eyebrow && (
      <p className="mb-4 text-sm font-black uppercase tracking-[0.3em] text-cyan-300">
        {eyebrow}
      </p>
    )}

    {title}

    {text && (
      <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
        {text}
      </p>
    )}
  </div>
);
const InfoBox = ({ icon: Icon, title, text, color }) => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-8 text-center backdrop-blur-xl">
    <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/10 ${color}`}>
      <Icon className="h-10 w-10" />
    </div>
    <h3 className={`mb-4 text-xl font-black uppercase ${color}`}>{title}</h3>
    <p className="text-sm leading-7 text-slate-400">{text}</p>
  </div>
);

const ContactLine = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3">
    <Icon className="h-5 w-5 text-cyan-300" />
    <span>{text}</span>
  </div>
);

const SocialIcon = ({ icon: Icon }) => (
  <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300 transition hover:-translate-y-1 hover:bg-cyan-400 hover:text-[#050816] hover:shadow-[0_0_25px_rgba(34,211,238,0.35)]">
    <Icon className="h-6 w-6" />
  </button>
);

const BottomCard = ({ icon: Icon, title, text }) => (
  <a
    href="#"
    className="group flex items-center gap-6 rounded-3xl border border-white/10 bg-white/[0.05] p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-[0_0_45px_rgba(34,211,238,0.14)]"
  >
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
      <Icon className="h-9 w-9" />
    </div>

    <div className="flex-1">
      <h3 className="mb-2 text-lg font-black text-white">{title}</h3>
      <p className="text-sm leading-6 text-slate-400">{text}</p>
    </div>

    <ArrowRight className="h-6 w-6 shrink-0 text-cyan-300 transition group-hover:translate-x-1" />
  </a>
);

const GraduationIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10L12 5 2 10l10 5 10-5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c3 2 9 2 12 0v-5" />
  </svg>
);

export default AboutUs;