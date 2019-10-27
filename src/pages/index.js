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
        title="Your personal insulin assistant"
        subtitle=""
        buttonText="Let's go"
        buttonOnClick={() => {
          router.push("/pricing");
        }}
      />
      <FeaturesSection
        color="white"
        size="medium"
        title="A new Diabetes management platform"
        subtitle="Increase feedback with patients without a face to face visit"
      />
    
      />
    </>
  );
}

export default IndexPage;
