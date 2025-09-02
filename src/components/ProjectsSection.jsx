import { ArrowRight, ExternalLink, Github } from "lucide-react";

const projects = [
	{
		id: 1,
		title: "Gatepass Online Application",
		description:
			"An online platform developed to streamline the vehicle pass registration process at Catanduanes State University. It offers a faster, more organized way for students, employees, and guests to register their vehicles and secure access permits digitally.",
		image: "/projects/project1.png",
		tags: ["Laravel", "TailwindCSS", "MySql"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 2,
		title: "Patient Information Management System",
		description:
			"Built a patient information system for CatSU Medical and Dental Services, with secure records, role-based access, reports, a simple dashboard, and a machine learning model to predict patient visits.",
		image: "/projects/project2.png",
		tags: ["Laravel", "TailwindCSS", "MySql"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 3,
		title: "LOCODE Interpreter",
		description:
			"A Python-based tool that executes LOLCODE programs, supporting core features like variables, math operations, and conditionals.",
		image: "/projects/project3.png",
		tags: ["Python"],
		demoUrl: "#",
		githubUrl: "#",
	},
	{
		id: 4,
		title: "Hotel Management System",
		description:
			"Full-featured e-commerce platform with user authentication and payment processing.",
		image: "/projects/project4.png",
		tags: ["VB.NET", "MS Acess"],
		demoUrl: "#",
		githubUrl: "#",
	},
  {
		id: 5,
		title: "Eggsposed",
		description:
			"A system that uses YOLOv11 for real-time egg detection and geospatial mapping to track infestations in rice fields, helping farmers respond more effectively.",
		image: "/projects/project5.png",
		tags: ["Python", "React.JS", "Flask", "MySQL", "OpenCV", "YOLOv11"],
		demoUrl: "#",
		githubUrl: "#",
	},
];

export const ProjectsSection = () => {
	return (
		<section id="projects" className="py-24 px-4 relative">
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
					{" "}
					Featured{" "}
					<span className="text-primary"> Projects </span>
				</h2>

				<p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
					Here are some of my recent projects. Each project was carefully crafted
					with attention to detail, performance, and user experience.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, key) => (
						<div
							key={key}
							className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
						>
							<div className="h-48 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>

							<div className="p-6">
								<div className="flex flex-wrap gap-2 mb-4 justify-center">
									{project.tags.map((tag) => (
										<span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground">
											{tag}
										</span>
									))}
								</div>

								<h3 className="text-xl font-semibold mb-1">
									{" "}
									{project.title}
								</h3>
								<p className="text-muted-foreground text-sm mb-4">
									{project.description}
								</p>
								<div className="flex justify-between items-center">
									<div className="flex space-x-3">
										<a
											href={project.demoUrl}
											target="_blank"
											className="text-foreground/80 hover:text-primary transition-colors duration-300"
										>
											<ExternalLink size={20} />
										</a>
										<a
											href={project.githubUrl}
											target="_blank"
											className="text-foreground/80 hover:text-primary transition-colors duration-300"
										>
											<Github size={20} />
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<a
						className="cosmic-button w-fit flex items-center mx-auto gap-2"
						target="_blank"
						href="https://github.com/jabstumalin"
					>
						Check My Github <ArrowRight size={16} />
					</a>
				</div>
			</div>
		</section>
	);
};
