import React from 'react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Github, Linkedin, Mail, Code, Palette, Brain, Database } from 'lucide-react';
import TeamMemberCard from './about/TeamMemberCard';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-6">
            Our Mission
          </h1>

          <Card className="p-8 mb-12">
            <p className="text-gray-300 leading-relaxed mb-6">
              Diabetes is a growing global health concern that affects millions of lives. Early detection and prevention are crucial in managing this condition effectively. Our mission is to leverage cutting-edge technology and machine learning to provide accessible, accurate diabetes risk assessment tools to everyone.
            </p>

            <p className="text-gray-300 leading-relaxed">
              We believe that by combining medical knowledge with advanced algorithms, we can help identify potential diabetes risks early, enabling timely intervention and better health outcomes. Our platform is designed to be user-friendly while maintaining clinical relevance, making healthcare more proactive and accessible.
            </p>
          </Card>

          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Meet Our Team
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TeamMemberCard
              name="Priyangshu Dutta"
              role="Frontend Developer & ML Engineer"
              avatarUrl="https://avatars.githubusercontent.com/u/134028923?s=400&u=5736771a3d2c92107ffd7ff85e7705e56fdcc676&v=4?auto=format&fit=crop&q=80&w=200&h=200"
              skills={[
                { icon: <Code className="w-4 h-4" />, label: "Frontend Development" },
                { icon: <Brain className="w-4 h-4" />, label: "Machine Learning" },
                { icon: <Palette className="w-4 h-4" />, label: "UI Design" }
              ]}
              socialLinks={[
                { icon: <Github className="w-5 h-5" />, url: "https://github.com/Priyangshu713/" },
                { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/priyangshu-dutta-/" },
         
              ]}
            />

            <TeamMemberCard
              name="Tarak Nath Jana"
              role="Backend Developer &  Deployment "
              avatarUrl="https://avatars.githubusercontent.com/u/140452004?v=4?auto=format&fit=crop&q=80&w=200&h=200"
              skills={[
                
                { icon: <Database className="w-4 h-4" />, label: "API Integration" },
                { icon: <Database className="w-4 h-4" />, label: "Backend Development" },
                { icon: <Database className="w-4 h-4" />, label: "Deploy Application" },
              ]}
              socialLinks={[
                { icon: <Github className="w-5 h-5" />, url: "https://github.com/tarakNathJ" },
                { icon: <Linkedin className="w-5 h-5" />, url: "https://www.linkedin.com/in/tarak-nath-jana-7411a0301/" },
             
              ]}
            />

            <TeamMemberCard
              name="Anirban Maity"
              role="Security Analyst & Pentester"
              avatarUrl="https://avatars.githubusercontent.com/u/174888109?v=4"
              skills={[
                { icon: <Code className="w-4 h-4" />, label: "Vulnerability Scanning & Assessment" },
                { icon: <Database className="w-4 h-4" />, label: "Web Penetration Testing" },
                { icon: <Palette className="w-4 h-4" />, label: "Network Security" },
                { icon: <Database className="w-4 h-4" />, label: "Report Analysis & Documentation" },
              ]}
              socialLinks={[
                { icon: <Github className="w-5 h-5" />, url: " https://github.com/cobraa9" },
              ]}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}