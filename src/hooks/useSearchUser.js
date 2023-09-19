import { useEffect, useState } from "react";
import slugify from "slugify";

export default function useSearchUser(data, textSearch) {
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (textSearch <= 0) return;
    const itemSearch = data.filter((value) => {
      const values = slugify(value.userName, {
        lower: true,
        replacement: " ",
        trim: true,
      });
      return values.toUpperCase().includes(textSearch.toUpperCase());
    });
    setDataSearch(itemSearch);
    setLoading(false);
  }, [textSearch, data]);

  return { dataSearch, setLoading, loading };
}
