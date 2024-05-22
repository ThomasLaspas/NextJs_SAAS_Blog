import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import logo from "@/public/vercel.svg";
interface Propr {
  users: {
    id: string;
    email: string;
    created_at: string;
    role: string;
    subscription_status: boolean;
    username: string;
    stripe_customer_id: string;
    stripe_subscription_id: string;
  }[];
}
function Uservard({ users }: Propr) {
  return (
    <>
      {users.map((us) => {
        return (
          <Card
            className={
              us.subscription_status
                ? "w-full text-center    border-2  border-primary shadow-xl shadow-primary"
                : "w-full text-center border-primary"
            }
            key={us.id}
          >
            <CardHeader>
              <CardTitle className="lg:text-md text-sm">{us.email}</CardTitle>
              <CardDescription>
                {us.subscription_status ? "Premium" : "Default"}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center py-4">
              <Image
                alt="user"
                width={100}
                height={100}
                className="rounded-full"
                src={logo}
              />
            </CardContent>
            <CardFooter>
              <h1 className="w-full lg:text-md text-sm">
                {us.stripe_customer_id ? us.stripe_customer_id : null}
              </h1>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
}

export default Uservard;
