"use client";
import { useState } from "react";
import InputField from "@/components/input-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetGenresQuery, useUploadFilmMutation } from "@/redux/store/api/filmsApi";
import UploadContent from "./upload-content";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function FilmUploadForm() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [fullFilm, setFullFilm] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  
  const { data: genresResponse } = useGetGenresQuery();
  const genres = genresResponse?.data || [];
  const [uploadFilm, { isLoading }] = useUploadFilmMutation();

  const filmTypes = [
    { value: "MOVIE", label: "Movie" },
    { value: "SERIES", label: "Series" },
    { value: "DOCUMENTARY", label: "Documentary" },
    { value: "SHORT", label: "Short Film" },
  ];

  const handleFilmUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Add selected genres as comma-separated string
    const genreString = selectedGenre.map(g => g.label).join(", ");
    formData.set("genre", genreString);
    
    // Add uploaded files
    if (trailer) formData.set("trailer", trailer[0]);
    if (fullFilm) formData.set("full_film", fullFilm[0]);
    if (thumbnail) formData.set("thumbnail", thumbnail[0]);

    try {
      const response = await uploadFilm(formData).unwrap();
      toast.success("Film uploaded successfully! It will be reviewed within 2-14 days.");
      router.push("/my-titles");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error?.data?.message || "Failed to upload film");
    }
  };

  return (
    <form className="my-5 space-y-5" onSubmit={handleFilmUpload}>
      {/* Film Information Card */}
      <Card>
        <CardHeader>
          <CardTitle>Film Information</CardTitle>
          <CardDescription>Basic details about your film</CardDescription>
        </CardHeader>

        <CardContent className="space-y-3">
          {/* title */}
          <InputField
            label="Film Title"
            name="title"
            placeholder="Enter film title"
            required
          />
          {/* logline */}
          <span>
            <Label>Logline</Label>
            <Textarea name="logline" placeholder="Enter film logline" required />
          </span>
          {/* year , type and genre */}
          <div className="grid lg:grid-cols-3 gap-3 my-3">
            {/* year */}
            <InputField
              type="number"
              label="Year"
              name="year"
              placeholder="Enter film year"
              min="1900"
              max="2030"
              required
            />
            {/* type */}
            <span>
              <Label>Type</Label>
              <Select name="film_type" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your film type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {filmTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </span>
            {/* genre */}
            <span>
              <Label>Genre</Label>
              <MultipleSelector
                commandProps={{
                  label: "Select genre",
                }}
                value={selectedGenre}
                onChange={setSelectedGenre}
                name="genre"
                defaultOptions={genres.map(genre => ({ 
                  value: genre.toLowerCase(), 
                  label: genre 
                }))}
                placeholder="Select genre"
                hideClearAllButton
                hidePlaceholderWhenSelected
                emptyIndicator={
                  <p className="text-center text-sm">Not found</p>
                }
              />
            </span>
          </div>
        </CardContent>
      </Card>
      {/* Submit Title Card */}
      <Card>
        <CardHeader>
          <CardTitle>Submit Title</CardTitle>
          <CardDescription>
            Upload your project and all its details and we'll get back to you
            within 2-14 days.
          </CardDescription>
          <CardContent className="my-5 px-0! grid grid-cols-1 lg:grid-cols-3 gap-5 space-y-3">
            {/* Upload Trailer */}
            <UploadContent
              content={trailer}
              maxSize={500}
              label="Trailer"
              title="Upload your film trailer"
              setContent={setTrailer}
              required
            />
            {/* Upload full film */}
            <UploadContent
              content={fullFilm}
              maxSize={5000}
              label="Full Film"
              title="Upload your full film"
              setContent={setFullFilm}
              required
            />
            {/* Upload thumbnail */}
            <UploadContent
              content={thumbnail}
              maxSize={20}
              accept={{ "image/*": [] }}
              label="Thumbnail"
              title="Upload your thumbnail"
              setContent={setThumbnail}
              required
            />
          </CardContent>
        </CardHeader>
      </Card>
      {/* Pricing Card */}
      <Card>
        <CardHeader>
          <CardTitle>Pricing</CardTitle>
          <CardDescription>Set your film pricing</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-3 md:gap-5">
          {/* title */}
          <InputField
            label="Rent Price ($)"
            name="rent_price"
            placeholder="4.99"
            type="number"
            min="0"
            step="0.01"
            required
          />
          <InputField
            label="Buy Price ($)"
            name="buy_price"
            placeholder="19.99"
            type="number"
            min="0"
            step="0.01"
            required
          />
        </CardContent>
      </Card>
      {/* Submit Btn */}
      <div className="text-center">
        <Button 
          className="w-full active:scale-[0.99]" 
          type="submit"
          disabled={isLoading || !trailer || !fullFilm || !thumbnail}
        >
          {isLoading ? "Uploading..." : "Submit for review"}
        </Button>
      </div>
    </form>
  );
}
