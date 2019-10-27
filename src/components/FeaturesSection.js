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
                title: "Connect diet with data",
                body:
                  "Insulin.ai leverages image recognition along social determinant based data to make insulin recommendations",
                image: "https://uploads.divjoy.com/undraw-fish_bowl_uu88.svg"
              },
              {
                title: "Location based analysis",
                body:
                  "Look at more than just insulin logs. We'll make recommendations for intervention that looks at each individuals location as well as particular situation",
                image: "https://uploads.divjoy.com/undraw-directions_x53j.svg"
              },
              {
                title: "Discover healthy habits",
                body:
                  "Data driven metrics for encouraging healthy patient behavior and exercise, regardless of individual background",
                image:
                  "https://uploads.divjoy.com/undraw-stability_ball_b4ia.svg"
              },
              {
                title: "Full CRM",
                body:
                  "Manage relationships will all your Diabetes patients with a single platform. Track insulin usage and have more intelligent conversations with patients to improve outcomes",
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
