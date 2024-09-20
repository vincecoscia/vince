import type { NextPage } from 'next'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import Head from 'next/head'
import { api } from '@/utils/api'
import * as Si from "react-icons/si";


const ExperiencePage: NextPage = () => {
  const { data: experiences, isLoading } = api.experience.getAll.useQuery();
  return (
    <>

      <Head>
        <title>vinecoscia | experience</title>
        <meta name="description" content="Experience page" />
      </Head>
      <section className="mb-24">
      <h2 className="text-3xl font-bold mb-8">
        <span className="text-purple-600">{'const '}</span>
        Experience = [
      </h2>
      <div className="space-y-6">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-3 w-1/3 mb-4" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-6 w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          // Actual content
          experiences?.map((job, index) => (
            <div key={index} className="group relative h-full">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Card className="relative h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="text-purple-600">{job.company}</p>
                <p className="text-sm text-muted-foreground mb-4">{job.period}</p>
                <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech) => {
                    const IconComponent = Si[tech.icon as keyof typeof Si];
                    return (
                      <Badge 
                        key={tech.id} 
                        variant="secondary"
                        className={`bg-${tech.color} hover:bg-${tech.color} text-white flex items-center gap-1`}
                      >
                        {IconComponent && <IconComponent size={14} />}
                        {tech.name}
                      </Badge>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            </div>

          ))
        )}
      </div>
      <p className="mt-4 text-right">];</p>
    </section>
    </>
  )
}

export default ExperiencePage