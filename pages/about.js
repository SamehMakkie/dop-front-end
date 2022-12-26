import { Heading, VStack } from "@chakra-ui/react";
import AboutTextSection from "../components/AboutTextSection/AboutTextSection";
import NavigationWrapper from "../views/NavigationWrapper/NavigationWrapper";
import PageStackSpacing from "../views/PageStackSpacing/PageStackSpacing";

const About = () => {
  return (
    <NavigationWrapper>
      <PageStackSpacing>
        <Heading>About</Heading>
        <VStack spacing={12} pb={20}>
          <AboutTextSection title={"Who are we?"}>
            Dream of Pixels is initiated by a bunch of EMU Master’s Degree and
            PhD students. We made this project for our User Interface
            Development course. We are aiming to help TRNC citizens and EMU
            students to have easier and cheaper access to games through DoP Game
            Store.
          </AboutTextSection>
          <AboutTextSection title={"Why should you register?"}>
            Registering to the DoP Game Store grants you access to a cart
            feature that allows you to buy multiple games at once and a game
            library where all of your purchased games can be downloaded.
          </AboutTextSection>
          <AboutTextSection title={"What information do we collect?"}>
            DoP cares about your privacy! We are not collecting any personal
            information except your email. This is just gathered during
            registration. Other services are not collecting your personal
            information.
          </AboutTextSection>
          <AboutTextSection title={"How do we use personal information?"}>
            We use your email for authentication and for sending you an email
            when you forget your password. Your email is never shared with 3rd
            parties.
          </AboutTextSection>
          <AboutTextSection title={"Is DoP suitable for everyone?"}>
            Yes, DoP Game Store only includes authorized games. Therefore, there
            are no unofficial, unlicensed, clone games, or games with adult
            content in DoP Game Store. All games are in line with international
            regulations and standards. Also, all comments are filtered from
            slang and insults in multiple languages, making DoP Game Store safe
            for everyone.
          </AboutTextSection>
        </VStack>
      </PageStackSpacing>
    </NavigationWrapper>
  );
};

export default About;
