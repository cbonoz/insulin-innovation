import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import Features from "./Features";
import "./FeaturesSection.scss";

function FeaturesSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          centered={true}
          size={3}
        />
        <div className="FeaturesSection__box box">
          <Features
            columns={2}
            items={[
              {
                title: "Lorem Ipsum",
                body:
                  "Integer ornare neque mauris, ac vulputate lacus venenatis et. Pellentesque ut ultrices purus.",
                image: "https://uploads.divjoy.com/undraw-fish_bowl_uu88.svg"
              },
              {
                title: "Location based analysis",
                body:
                  "Look at more than just insulin logs. We'll make recommendations for intervention that looks at each individuals location as well as particular situation",
                image: "https://uploads.divjoy.com/undraw-directions_x53j.svg"
              },
              {
                title: "Encourage healthy habits",
                body:
                  "Data driven metrics for encouraging healthy patient behavior and exercise",
                image:
                  "https://uploads.divjoy.com/undraw-stability_ball_b4ia.svg"
              },
              {
                title: "Full CRM",
                body:
                  "Manage relationships will all your Diabetes patients with a single platform",
                image:
                  "https://uploads.divjoy.com/undraw-personal_settings_kihd.svg"
              }
            ]}
          />
        </div>
      </div>
    </Section>
  );
}

export default FeaturesSection;
