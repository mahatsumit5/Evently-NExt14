import React, { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ICatagory } from "@/lib/mongodb/database/models/category.model";
import CategoryDialog from "./CategoryDialog";
import { getAllCategories } from "@/lib/actions/category.actions";

type DropDownProps = {
  value?: string;
  onChangeHandler?: () => void;
};
const Dropdown = ({ value, onChangeHandler }: DropDownProps) => {
  const [categories, setCatagories] = useState<ICatagory[]>([]);
  useEffect(() => {
    async function getData() {
      const result = await getAllCategories();
      setCatagories(result as ICatagory[]);
    }
    getData();
  }, []);
  return (
    <div>
      <Select onValueChange={onChangeHandler} defaultValue={value}>
        <SelectTrigger className="select-field">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 &&
            categories.map((category) => (
              <SelectItem
                value="light"
                key={category._id}
                className="select-item "
              >
                {category.name}
              </SelectItem>
            ))}
          <CategoryDialog setCatagories={setCatagories} />
        </SelectContent>
      </Select>
    </div>
  );
};

export default Dropdown;
