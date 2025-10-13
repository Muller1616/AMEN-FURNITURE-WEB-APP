"use client"
import Image from "next/image"
import { companyStory, missionAndValues, teamMembers } from "../data/about-data"
import Header from "@/components/header/Header"
import Footer from "@/components/footer/Footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FA]">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#2C3E50] text-white py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <Image src="/furniture-workshop.jpg" alt="Furniture Workshop" fill className="object-cover" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">About Our Story</h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Crafting exceptional furniture with passion, precision, and purpose since 2010
          </p>
        </div>
      </section>

      {/* Company Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-6">{companyStory.title}</h2>
              <p className="text-gray-700 text-lg mb-4 leading-relaxed">{companyStory.description}</p>
              <p className="text-gray-600 leading-relaxed">{companyStory.extendedDescription}</p>
            </div>
            <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image src="/about-story-image.jpg" alt="Our Story" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">{missionAndValues.mission.title}</h2>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {missionAndValues.mission.description}
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {missionAndValues.values.map((value, index) => (
              <div
                key={index}
                className="bg-[#F5F7FA] p-6 md:p-8 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-[#5B7B8F] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2C3E50] mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The passionate individuals behind every piece of furniture we create
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 md:h-72 bg-gray-200">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C3E50] mb-1">{member.name}</h3>
                  <p className="text-[#5B7B8F] font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-[#2C3E50] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Explore our collection and discover furniture that tells your story
          </p>
          <button className="bg-[#5B7B8F] hover:bg-[#4A6A7D] text-white px-8 py-3 md:px-10 md:py-4 rounded-lg font-semibold text-lg transition-colors duration-300">
            Shop Now
          </button>
        </div>
      </section>

      
    </div>
  )
}