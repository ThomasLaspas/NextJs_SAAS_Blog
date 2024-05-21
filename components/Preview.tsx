import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MarkdownPreview from "./MarkdownPreview";
interface Props {
  title: string;
  con: string;
}
import logo from "@/finland.jpg";
export const Preview = ({ title, con }: Props) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className=" w-full h-[70vh]">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>Date and time</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Image
              src={logo}
              alt="img"
              width={100}
              height={200}
              className="sm:w-1/2 w-full sm:px-0 sm:h-[400px] px-2"
            />
            <MarkdownPreview content={con} />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
