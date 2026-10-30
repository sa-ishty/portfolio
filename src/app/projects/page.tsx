import type { Metadata } from "next";

import { Container } from "@/components/container";
import { PageHeader } from "@/components/page-header";
import { ProjectFilter } from "@/components/project-filter";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Networking labs, security assessments, software design and upcoming automation and AWS projects by Shahriar Adnan Ishty.",
};

export default function ProjectsPage() {
  return (
    <Container className="pb-20">
      <PageHeader
        command="show projects"
        title="Projects"
        intro="Labs, assessments and designs, with the code on GitHub. Filter by area."
      />
      <ProjectFilter />
    </Container>
  );
}
