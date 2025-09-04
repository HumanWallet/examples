import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@examples/ui"
import { Home, ArrowLeft } from "lucide-react"
import { Link, useNavigate } from "react-router"

/**
 * 404 Not Found page component for handling non-existing routes
 */
export function NotFoundPage() {
  const navigate = useNavigate()

  const handleGoBack = (): void => {
    navigate(-1)
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-16">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Oops! Lost in Cyberspace</h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Looks like you&apos;ve ventured into the unknown digital realm.
          </p>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">What would you like to do?</CardTitle>
            <CardDescription>Choose an option to continue your HumanWallet experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full">
              <Link to="/">
                <Home className="size-4 mr-2" />
                Go to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={handleGoBack} className="w-full">
              <ArrowLeft className="size-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
