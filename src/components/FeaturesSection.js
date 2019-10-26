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
                title: "Lorem Ipsum",
                body:
                  "Nunc nulla mauris, laoreet vel cursus lacinia, consectetur sit amet tellus.",
                image: "https://uploads.divjoy.com/undraw-directions_x53j.svg"
              },
              {
                title: "Lorem Ipsum",
                body:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lobortis, metus et mattis ullamcorper",
                image:
                  "https://uploads.divjoy.com/undraw-stability_ball_b4ia.svg"
              },
              {
                title: "Lorem Ipsum",
                body:
                  "Suspendisse ut tincidunt eros. In velit mi, rhoncus dictum neque a, tincidunt lobortis justo",
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
