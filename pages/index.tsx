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
import { getContentData } from "@/common/general_parser";
import MissionStatement from "../src/components/home/MissionStatement";
import Banner from "@/common/banner";
import { MissionMetaData } from "@/schemas/MissionMetaData";
import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";
import WwdHomepage from "./home/WwdHomepage";

// interface ImpactProp {
//     data: ImpactMetaData[];
// }
interface MissionProp {
    data: MissionMetaData[], 
    wwdData: WWeDoMetaData[],
}
const HomePage: React.FC<MissionProp> = ({wwdData, data}) => {
    // receive it here
    return (
        <>
            <Banner />
    
            <MissionStatement data={data} />
            <WwdHomepage data={wwdData} />
        </>
    );
};

export async function getStaticProps() {
    //const data: ImpactMetaData[] = await getContentData<ImpactMetaData>("impact");
    // get brief mission data
    const data : MissionMetaData[] = await getContentData<MissionMetaData>("mission");
    // get other data that'll need to be in the HomePage
    const wwdData : WWeDoMetaData[] = await getContentData<WWeDoMetaData>("what-we-do");

    return {
        props: {
            data,
            wwdData
        },
    };
}

export default HomePage;