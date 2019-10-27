import React from "react";
import HeroSection from "./../components/HeroSection";
import FeaturesSection from "./../components/FeaturesSection";
import CtaSection from "./../components/CtaSection";
import { useRouter } from "./../util/router.js";

function IndexPage(props) {
  const router = useRouter();

  return (
    <>
      <HeroSection
        color="primary"
        size="large"
        title="Just in time insulin recommendations"
        subtitle=""
        buttonText="Get Started"
        buttonOnClick={() => {
          router.push("/dashboard");
        }}
      />
      <FeaturesSection
        color="white"
        size="medium"
        title="A new insulin dosing management platform"
        subtitle="Effective insulin administration tailored for every individual, diet, and background"
      />
    
      />
    </>
  );
}

export default IndexPage;
