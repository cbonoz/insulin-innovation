import React from "react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import SectionButton from "./SectionButton";

function CtaSection(props) {
  return (
    <Section color={props.color} size={props.size}>
      <div className="container">
        <div className="columns is-vcentered has-text-centered-mobile is-centered is-variable is-8">
          <div className="column is-narrow">
            <SectionHeader
              title={props.title}
              subtitle={props.subtitle}
              size={3}
            />
          </div>
          <div className="column is-narrow">
            <SectionButton
              parentColor={props.color}
              size="medium"
              onClick={props.buttonOnClick}
            >
              {props.buttonText}
            </SectionButton>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default CtaSection;
