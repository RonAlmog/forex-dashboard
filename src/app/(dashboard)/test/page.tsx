import { Button } from "@/components/ui/button";
import { btFlag } from "@/lib/flags";

const page = async () => {
  const flag: boolean = await btFlag();
  return (
    <div>
      {flag ? (
        <Button>Hello</Button>
      ) : (
        <div>
          <p>No Hello for you</p>
        </div>
      )}
    </div>
  );
};

export default page;
