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
        buttonText="Let's go"
        buttonOnClick={() => {
          router.push("/dashboard");
        }}
      />
      <FeaturesSection
        color="white"
        size="medium"
        title="A new Diabetes management platform"
        subtitle="Effective insulin administration tailored for every individual and diet"
      />
    
      />
    </>
  );
}

export default IndexPage;
