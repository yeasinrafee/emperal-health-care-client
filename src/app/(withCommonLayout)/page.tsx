import HeroSection from '@/components/UI/HomePage/HeroSection/HeroSection';
import HowItWorks from '@/components/UI/HomePage/HowItWorks/HowItWorks';
import Specialist from '@/components/UI/HomePage/Specialist/Specialist';
import TopRatedDoctors from '@/components/UI/HomePage/TopRatedDoctors/TopRatedDoctors';
import WhyUs from '@/components/UI/HomePage/WhyUs/WhyUs';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Specialist />
      <TopRatedDoctors />
      <WhyUs />
      <HowItWorks />
    </>
  );
}
