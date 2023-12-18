import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { Dispatch, SetStateAction, startTransition, useState } from "react";
import { createCategory } from "@/lib/actions/category.actions";
import { ICatagory } from "@/lib/mongodb/database/models/category.model";

type dialogProps = {
  setCatagories: Dispatch<SetStateAction<ICatagory[]>>;
};
const CategoryDialog = ({ setCatagories }: dialogProps) => {
  const [newCategory, setCategory] = useState("");
  const handleAddCategory = () => {
    createCategory({ newCategory }).then((result) => {
      setCatagories((prevState) => [...prevState, result]);
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-18 text-primary-500 hover:bg-primary-50 focus:text-primary-500">
        Add new Category
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>New Category</AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              type="text"
              placeholder="Category Name"
              className="input-field mt-3"
              onChange={(e) => setCategory(e.target.value)}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>
            Add
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CategoryDialog;
