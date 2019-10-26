import React from "react";
import ContentSection from "./../components/ContentSection";
import StatsSection from "./../components/StatsSection";
import TeamBiosSection from "./../components/TeamBiosSection";
import CtaSection from "./../components/CtaSection";
import { useRouter } from "./../util/router.js";

function AboutPage(props) {
  const router = useRouter();

  return (
    <>
      <ContentSection
        color="white"
        size="large"
        title="We help you make money"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum consequatur numquam aliquam tenetur ad amet inventore hic beatae, quas accusantium perferendis sapiente explicabo, corporis totam!"
      />
      <StatsSection
        color="light"
        size="medium"
        items={[
          {
            title: "Tweets",
            stat: "3,456"
          },
          {
            title: "Following",
            stat: "123"
          },
          {
            title: "Followers",
            stat: "456k"
          },
          {
            title: "Likes",
            stat: "789"
          }
        ]}
      />
      <TeamBiosSection
        color="white"
        size="medium"
        title="Meet the Team"
        subtitle=""
      />
      <CtaSection
        color="primary"
        size="medium"
        title="Ready to get started?"
        subtitle=""
        buttonText="Get Started"
        buttonOnClick={() => {
          router.push("/pricing");
        }}
      />
    </>
  );
}

export default AboutPage;
