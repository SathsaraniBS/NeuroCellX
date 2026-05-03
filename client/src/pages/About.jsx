import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  CheckCircle2,
  Compass,
  Eye,
  Facebook,
  Flag,
  Globe2,
  Instagram,
  Leaf,
  Lightbulb,
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
} from "lucide-react";

const AboutUs = () => {
  const values = [
    {
      title: "Education-first",
      text: "We simplify complex EV topics.",
      icon: GraduationIcon,
    },
    {
      title: "User-first",
      text: "Your journey, your needs.",
      icon: Users,
    },
    {
      title: "Transparency",
      text: "Honest, unbiased, and reliable info.",
      icon: ShieldCheck,
    },
    {
      title: "Sustainability",
      text: "For a cleaner planet.",
      icon: Leaf,
    },
    {
      title: "Innovation",
      text: "Continuous learning and improvement.",
      icon: Lightbulb,
    },
  ];

  const workItems = [
    "Clear EV explanations for beginners and enthusiasts.",
    "Practical tools for charging, trip planning, and battery care.",
    "Up-to-date EV market, technology, and policy insights.",
    "Local insights for Sri Lanka’s EV ecosystem.",
    "Trusted, simple, and independent information.",
  ];

  const team = [
    {
      name: "Kavindu De Silva",
      role: "Founder & CEO",
      text: "EV enthusiast and clean mobility advocate. Passionate about making EV knowledge accessible to everyone.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Nimali Perera",
      role: "Product Lead",
      text: "Works on product strategy and user experience to make complex EV info simple and useful.",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Tharindu Fernando",
      role: "Tech Lead",
      text: "Loves building scalable tools and dashboards that turn data into meaningful insights.",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    },
    {
      name: "Dilhara Weerasinghe",
      role: "Content & Research",
      text: "Researches EV tech, writes guides, and ensures every article is accurate and easy to understand.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    },
  ];

  const testimonials = [
    {
      text: "Finally an EV guide that actually explains things simply. VoltIQ helped me choose the right EV with confidence.",
      name: "Sachin, EV Owner",
    },
    {
      text: "The charging map and trip planner made my long drives stress-free. Super useful for Sri Lanka roads!",
      name: "Tharushi, EV Driver",
    },
    {
      text: "I love the battery and maintenance tips. It’s like having an EV expert in my pocket.",
      name: "Nuwan, EV Enthusiast",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[#071b3a]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="text-4xl font-semibold tracking-tight">
            Volt<span className="text-teal-400">IQ</span>
          </div>

          <nav className="hidden items-center gap-10 text-base font-semibold md:flex">
            {[
              "Home",
              "EV Types",
              "Charging",
              "Battery",
              "Guides",
              "Trip Planner",
              "About Us",
              "Contact",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className={`relative transition hover:text-teal-500 ${
                  item === "About Us" ? "text-teal-500" : ""
                }`}
              >
                {item}
                {item === "About Us" && (
                  <span className="absolute -bottom-6 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-teal-400" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Bell className="h-7 w-7" />
            <div className="relative h-14 w-14 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-teal-400 p-1">
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=200&q=80"
                alt="User"
                className="h-full w-full rounded-full object-cover"
              />
              <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-teal-400" />
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f5fbff] via-[#eef8ff] to-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <h1 className="mb-5 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              About Us
            </h1>

            <p className="max-w-2xl text-2xl font-extrabold leading-9 text-teal-500">
              We’re building smarter tools to help you understand, buy, and own
              EVs with confidence.
            </p>

            <p className="mt-6 max-w-xl text-xl leading-8 text-[#314463]">
              Think of us as your EV-focused guide: from charging to battery
              care, we simplify the EV journey.
            </p>

            <div className="mt-9 grid max-w-xl gap-6 sm:grid-cols-2">
              <HeroMiniCard
                icon={Leaf}
                title="Cleaner Future"
                text="Lower emissions for a better planet."
              />
              <HeroMiniCard
                icon={Wrench}
                title="Smarter Mobility"
                text="Smarter choices for every driver."
              />
            </div>
          </div>

          <div className="relative min-h-[360px]">
            <div className="absolute inset-x-0 bottom-0 h-32 rounded-full bg-blue-200/40 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=1200&q=80"
              alt="EV charging station"
              className="relative z-10 h-[360px] w-full rounded-[2rem] object-cover shadow-xl"
            />
          </div>
        </div>
      </section>

      <main className="rounded-t-[2rem] bg-white px-6 py-10">
        {/* STORY */}
        <section className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-slate-100 bg-white p-8 shadow-sm md:grid-cols-[1.1fr_0.9fr] md:p-12">
          <div className="flex gap-8">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-500">
              <Flag className="h-12 w-12" />
            </div>

            <div>
              <h2 className="mb-6 text-3xl font-extrabold">Our Story</h2>

              <div className="space-y-5 text-base leading-8 text-[#314463]">
                <p>
                  We started VoltIQ with a simple belief: EV information should
                  be clear, reliable, and easy to access. When we began our own
                  EV journey, we found that advice was scattered, technical, and
                  often confusing.
                </p>
                <p>
                  We saw a gap between fast-changing EV technology and the
                  everyday driver who just wants to know what’s right for them.
                </p>
                <p>
                  That’s why we built VoltIQ — to bring everything together in
                  one place: EV knowledge, practical tools, and real-world
                  guidance.
                </p>
                <p>
                  Our mission is to empower more people to choose electric,
                  drive smarter, and build a cleaner future for Sri Lanka and
                  the world.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="w-full max-w-md rounded-xl border border-teal-100 bg-gradient-to-br from-teal-50 to-white p-12 shadow-sm">
              <div className="mb-8 text-6xl font-black text-teal-300">“</div>
              <p className="text-3xl font-extrabold leading-tight">
                The best way to predict the future is to drive it.
              </p>
              <p className="mt-8 text-xl font-bold text-[#314463]">
                — Our Belief
              </p>
              <div className="mt-6 flex justify-end">
                <Leaf className="h-12 w-12 text-teal-300" />
              </div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="Mission, Vision & Values" />

          <div className="grid gap-6 lg:grid-cols-[0.8fr_0.8fr_1.8fr]">
            <InfoBox
              icon={Target}
              title="Mission"
              text="Our mission is to help people understand EVs, make informed decisions, and own EVs more easily."
              color="text-teal-500"
              bg="bg-teal-50"
            />
            <InfoBox
              icon={Eye}
              title="Vision"
              text="A future where EVs are the default choice for every driver."
              color="text-blue-500"
              bg="bg-blue-50"
            />

            <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
              <h3 className="mb-6 text-2xl font-extrabold">Our Values</h3>

              <div className="grid gap-6 md:grid-cols-2">
                {values.map((value) => {
                  const Icon = value.icon;
                  return (
                    <div key={value.title} className="flex gap-4">
                      <Icon className="h-8 w-8 shrink-0 text-teal-500" />
                      <div>
                        <h4 className="font-extrabold">{value.title}</h4>
                        <p className="text-sm leading-6 text-[#314463]">
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
        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="What We Do" />

          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="flex justify-center">
              <div className="relative h-80 w-full max-w-md rounded-[2rem] bg-gradient-to-br from-blue-50 to-teal-50 p-6 shadow-sm">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80"
                  alt="EV platform dashboard"
                  className="h-full w-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div>
              <p className="mb-6 text-base leading-8 text-[#314463]">
                We provide EV-focused content, guides, and tools in one place to
                support you at every step of your EV journey.
              </p>

              <div className="space-y-4">
                {workItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-base font-semibold text-[#314463]"
                  >
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-teal-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="Our Team" />

          <div className="grid gap-6 md:grid-cols-4">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="mx-auto mb-4 h-24 w-24 rounded-full object-cover"
                />

                <h3 className="text-lg font-extrabold">{member.name}</h3>
                <p className="mb-3 text-sm font-bold text-teal-500">
                  {member.role}
                </p>
                <p className="min-h-[96px] text-sm leading-6 text-[#314463]">
                  {member.text}
                </p>

                <div className="mt-5 flex justify-center gap-5 text-blue-500">
                  <Linkedin className="h-5 w-5" />
                  <Mail className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto mt-12 max-w-7xl">
          <SectionTitle title="What Our Users Say" />

          <div className="flex items-center gap-6">
            <button className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm md:flex">
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="grid flex-1 gap-6 md:grid-cols-3">
              {testimonials.map((item) => (
                <div
                  key={item.name}
                  className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="mb-4 text-xl text-yellow-400">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="mb-5 text-sm leading-7 text-[#314463]">
                    {item.text}
                  </p>
                  <p className="text-sm font-bold text-[#314463]">
                    — {item.name}
                  </p>
                </div>
              ))}
            </div>

            <button className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm md:flex">
              <ArrowRight className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            <span className="h-3 w-3 rounded-full bg-teal-400" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
            <span className="h-3 w-3 rounded-full bg-slate-300" />
          </div>
        </section>

        {/* CONTACT + SOCIAL */}
        <section className="mx-auto mt-12 grid max-w-7xl gap-6 rounded-xl border border-slate-200 bg-gradient-to-br from-teal-50 via-white to-blue-50 p-8 shadow-sm lg:grid-cols-[1fr_1.5fr]">
          <div>
            <h2 className="mb-4 text-3xl font-extrabold text-teal-600">
              Let’s Connect
            </h2>
            <p className="mb-6 text-base leading-7 text-[#314463]">
              Have questions, ideas, or want to collaborate? We’d love to hear
              from you.
            </p>

            <div className="space-y-4 text-base font-semibold text-[#314463]">
              <ContactLine icon={Mail} text="hello@voltiq.lk" />
              <ContactLine icon={Phone} text="+94 77 123 4567" />
              <ContactLine icon={MapPin} text="Colombo, Sri Lanka" />
            </div>

            <button className="mt-6 inline-flex items-center gap-3 rounded-lg bg-teal-500 px-6 py-3 font-bold text-white shadow-md transition hover:bg-teal-600">
              Contact Us
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-[1fr_1fr]">
            <div>
              <h2 className="mb-4 text-3xl font-extrabold text-teal-600">
                Follow Us
              </h2>
              <p className="mb-6 text-base leading-7 text-[#314463]">
                Stay updated with the latest EV news, guides, and updates.
              </p>

              <div className="flex gap-4">
                <SocialIcon icon={Facebook} color="bg-blue-500" />
                <SocialIcon icon={Instagram} color="bg-pink-500" />
                <SocialIcon icon={Youtube} color="bg-red-500" />
                <SocialIcon icon={Linkedin} color="bg-blue-600" />
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1593941707882-a5bba53b0998?auto=format&fit=crop&w=800&q=80"
              alt="EV follow us"
              className="h-52 w-full rounded-2xl object-cover"
            />
          </div>
        </section>

        {/* BOTTOM CARDS */}
        <section className="mx-auto mt-6 grid max-w-7xl gap-5 md:grid-cols-3">
          <BottomCard
            icon={Leaf}
            title="Explore EV Tools"
            text="Use our smart tools and calculators for your EV journey."
            color="emerald"
          />
          <BottomCard
            icon={Compass}
            title="Browse EV Guides"
            text="Learn everything about EVs, charging, batteries & more."
            color="blue"
          />
          <BottomCard
            icon={MessageCircle}
            title="Contact Us"
            text="We’re here to help you every step of the way."
            color="violet"
          />
        </section>

        <footer className="pb-8 pt-8 text-center">
          <p className="text-sm text-slate-500">
            Drive electric. Drive the future.
          </p>
          <p className="mt-2 text-sm font-semibold text-slate-500">
            © 2025 VoltIQ. All rights reserved.
          </p>
        </footer>
      </main>
    </div>
  );
};

const HeroMiniCard = ({ icon: Icon, title, text }) => (
  <div className="flex items-center gap-4">
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-500">
      <Icon className="h-8 w-8" />
    </div>
    <div>
      <h3 className="font-extrabold text-teal-600">{title}</h3>
      <p className="text-sm leading-6 text-[#314463]">{text}</p>
    </div>
  </div>
);

const SectionTitle = ({ title }) => (
  <div className="mb-8 text-center">
    <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
    <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-teal-400" />
  </div>
);

const InfoBox = ({ icon: Icon, title, text, color, bg }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
    <div className={`mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full ${bg} ${color}`}>
      <Icon className="h-14 w-14" />
    </div>
    <h3 className={`mb-4 text-xl font-extrabold ${color}`}>{title}</h3>
    <p className="text-sm leading-7 text-[#314463]">{text}</p>
  </div>
);

const ContactLine = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3">
    <Icon className="h-5 w-5 text-teal-500" />
    <span>{text}</span>
  </div>
);

const SocialIcon = ({ icon: Icon, color }) => (
  <button className={`flex h-12 w-12 items-center justify-center rounded-full text-white ${color}`}>
    <Icon className="h-6 w-6" />
  </button>
);

const BottomCard = ({ icon: Icon, title, text, color }) => {
  const colors = {
    emerald: "bg-emerald-50 text-emerald-500",
    blue: "bg-blue-50 text-blue-500",
    violet: "bg-violet-50 text-violet-500",
  };

  return (
    <a
      href="#"
      className={`group flex items-center gap-6 rounded-xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-xl ${colors[color]}`}
    >
      <Icon className="h-14 w-14 shrink-0" />
      <div className="flex-1">
        <h3 className="mb-2 font-extrabold">{title}</h3>
        <p className="text-sm leading-6 text-[#314463]">{text}</p>
      </div>
      <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
    </a>
  );
};

const GraduationIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 10L12 5 2 10l10 5 10-5z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12v5c3 2 9 2 12 0v-5"
    />
  </svg>
);

export default AboutUs;