import { Head } from '@inertiajs/react'
import { Link } from '@inertiajs/react'
import { Button } from '~/components/ui/button'
import { Card } from '~/components/ui/card'
import { ArrowRight, CheckCircle, Star } from "lucide-react"

export default function Home() {
  return (
    <>
      <Head title="Home" />
      <div className="flex min-h-screen flex-col">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/10 to-background pt-20 pb-16">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Recrutement intelligent avec SmartHire AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Trouvez les meilleurs talents ou le job idéal grâce à notre technologie d'IA avancée qui match
                    parfaitement les candidats et les recruteurs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup?type=candidate">
                    <Button size="lg" className="w-full min-[400px]:w-auto">
                      Je suis candidat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/signup?type=recruiter">
                    <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                      Je suis recruteur
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>Plus de 10 000 recrutements réussis</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full max-w-[500px] sm:h-[400px] lg:h-[500px] overflow-hidden">
                  <img
                    src="https://placehold.co/500"
                    alt="SmartHire AI Platform"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Fonctionnalités
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Comment ça marche</h2>
                <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Notre plateforme utilise l'intelligence artificielle pour créer des connexions parfaites entre candidats
                  et recruteurs.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <Card className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">IA Avancée</h3>
                <p className="text-muted-foreground">
                  Notre algorithme analyse en profondeur les compétences, l'expérience et la culture d'entreprise pour des
                  matchs parfaits.
                </p>
              </Card>
              <Card className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Gain de Temps</h3>
                <p className="text-muted-foreground">
                  Réduisez de 70% le temps consacré au recrutement grâce à nos recommandations personnalisées.
                </p>
              </Card>
              <Card className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Meilleurs Résultats</h3>
                <p className="text-muted-foreground">
                  95% des recrutements réalisés notre platefore aboutissent à des collaborations durables.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-muted py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Témoignages
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Ils nous font confiance</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Découvrez ce que nos utilisateurs disent de SmartHire AI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="https://placehold.co/60"
                    alt="Avatar"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      "SmartHire AI a révolutionné notre processus de recrutement. Nous avons trouvé des talents
                      exceptionnels qui correspondent parfaitement à notre culture d'entreprise."
                    </p>
                    <div>
                      <h4 className="font-semibold">Sophie Martin</h4>
                      <p className="text-sm text-muted-foreground">DRH, Tech Solutions</p>
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <img
                    src="https://placehold.co/60"
                    alt="Avatar"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      "En tant que développeur, j'ai trouvé mon emploi idéal en moins de deux semaines grâce à SmartHire
                      AI. Les recommandations étaient parfaitement adaptées à mes compétences."
                    </p>
                    <div>
                      <h4 className="font-semibold">Thomas Dubois</h4>
                      <p className="text-sm text-muted-foreground">Développeur Full Stack</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">10,000+</div>
                <p className="text-muted-foreground">Recrutements réussis</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">5,000+</div>
                <p className="text-muted-foreground">Entreprises partenaires</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="text-4xl font-bold">95%</div>
                <p className="text-muted-foreground">Taux de satisfaction</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-12 md:py-16 lg:py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-primary-foreground">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Prêt à transformer votre recrutement ?
                </h2>
                <p className="mx-auto max-w-[600px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Rejoignez SmartHire AI aujourd'hui et découvrez la puissance du recrutement intelligent.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup?type=candidate">
                  <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto">
                    Je suis candidat
                  </Button>
                </Link>
                <Link href="/signup?type=recruiter">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Je suis recruteur
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-background py-6 md:py-8">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 mx-auto">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
              <Link href="/" className="flex items-center space-x-2">
                <img src="https://placehold.co/30" alt="SmartHire AI Logo" width={30} height={30} />
                <span className="font-bold">SmartHire AI</span>
              </Link>
              <nav className="flex gap-4 sm:gap-6">
                <Link href="#" className="text-sm hover:underline underline-offset-4">
                  À propos
                </Link>
                <Link href="#" className="text-sm hover:underline underline-offset-4">
                  Fonctionnalités
                </Link>
                <Link href="#" className="text-sm hover:underline underline-offset-4">
                  Tarifs
                </Link>
                <Link href="#" className="text-sm hover:underline underline-offset-4">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="text-center text-sm text-muted-foreground md:text-right">
              &copy; {new Date().getFullYear()} SmartHire AI. Tous droits réservés.
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
