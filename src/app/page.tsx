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
import { getContentData } from "../common/general_parser";
import Navbar from '@/common/Navbar'
import Banner from '@/common/banner'
import { ProjectMetaData } from "@/schemas/ProjectMetaData";
import { ImpactMetaData } from "@/schemas/ImpactMetaData";
import { WWeDoMetaData } from "@/schemas/WWeDoMetaData";

export default function HomePage() {

  getContentData<ProjectMetaData>("projects").then((res) => {
    console.log(res)
  })
  getContentData<ImpactMetaData>("impact").then((res) => {
    console.log(res)
    console.log(res[0].tableExample)
  })
  getContentData<WWeDoMetaData>("what-we-do").then((res) => {
    console.log(res)
  })

  return (
    <main>
      <Banner/>
    </main>
  )
}
