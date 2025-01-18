/*
 * Copyright (C) 2023 UTMIST (utorontomist@gmail.com)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use client";

import MissionStatement from "@components/home/MissionStatement";
import Banner from "@components/common/banner";
import WwdHomepage from "@components/home/WwdHomepage";
import AlumniSpotlight from "@components/home/AlumniSpotlight";
import Impact from "@components/home/Impact";
import NewsletterHomepage from "@components/home/NewsletterHomepage";

import { MissionMetaData } from "@components/schemas/MissionMetaData";
import { WWeDoMetaData } from "@components/schemas/WWeDoMetaData";
import { AlumniMetaData } from "@components/schemas/AlumniMetaData";
import { ImpactMetaData } from "@components/schemas/ImpactMetaData";

// TODO: these ideally should NOT be hard-coded into the .ts file, requires recompilation and is in general a bad idea. 
// for now, this satisfies our requirements, but in the short-term, we need to move these to sanity as it's a CMS designed for this purpose.
const missionData: MissionMetaData[] = [
  {
    slug: "mission1",
    contents:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "#",
    publishDate: "1970",
  },
];

const wwdData: WWeDoMetaData[] = [
  {
    slug: "what-we-do-1",
    title: "What We Do 1",
    imgPath: "https://placeholder.pics/svg/200",
    buttonHref: "#",
    publishDate: "1970",
  },
];

const alumniData: AlumniMetaData[] = [
  {
    slug: "alumni1",
    name: "Jane Doe",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec justo vel sapien varius efficitur. Nullam sit amet metus sit amet metus scelerisque consectetur non a felis. Sed vel aliquet odio. Proin nec tellus quis nunc efficitur tincidunt.",
    imgPath: "https://placeholder.pics/svg/200",
    linkedIn: "#",
    publishDate: "1970",
  },
];

// publishDate makes sense here
const impactData: ImpactMetaData[] = [
  {
    slug: "impact1",
    events: "500+",
    members: "250+",
    projects: "10+",
    publishDate: "1970",
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Banner />
      <MissionStatement data={missionData} />
      <WwdHomepage data={wwdData} />
      <AlumniSpotlight data={alumniData} />
      <Impact data={impactData} />
      <NewsletterHomepage />
    </>
  );
};

export default HomePage;
