/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import CustomInput from "../components/Custoninput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/connect.provider";
import { useContext } from "react";

import Login from "../components/Login";
import Signup from "../components/Signup";

const Publish = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [picture, setPicture] = useState();
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!title || !description || !price || !picture) {
        // Afficher un message d'erreur à l'utilisateur
        alert(
          "Veuillez remplir les champs obligatoires : titre, description, prix."
        );
        return;
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("city", city);
      formData.append("condition", condition);
      formData.append("brand", brand);
      formData.append("color", color);
      formData.append("picture", picture);
      formData.append("size", size);

      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/offer/publish`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return isAuthenticated ? (
    <main>
      <section className="publish-container container">
        <h1>Vends ton article</h1>
        <form>
          <CustomInput
            className="publish-file publish-form"
            title="Photo de l'article"
            label="file"
            type="file"
            setState={setPicture}
            setPreview={setPreview}
            inputType="input"
          />
          {!preview ? (
            <div className="input-form publish-form">
              <p>Aucun fichier sélectionné pour le moment</p>
            </div>
          ) : (
            <div className="publish-pic publish-form">
              <img src={preview} alt="pré-visualisation" />
            </div>
          )}
          <CustomInput
            className="publish-form"
            title="Titre"
            label="title"
            type="text"
            placeholder="ex:Airmax 90"
            setState={setTitle}
            value={title}
            inputType="input"
          />
          <CustomInput
            className="publish-form"
            title="Décris ton article"
            label="descrition"
            type="text"
            placeholder="ex:Airmax 90 rouge"
            setState={setDescription}
            value={description}
            inputType="textarea"
          />
          <CustomInput
            className="publish-form"
            title="Marque"
            label="brand"
            type="text"
            placeholder="ex:Nike"
            setState={setBrand}
            value={brand}
            inputType="input"
          />
          <CustomInput
            className="publish-form"
            title="Taille"
            label="size"
            type="text"
            placeholder="ex:M, L, 38, 52"
            setState={setSize}
            value={size}
            inputType="input"
          />
          <CustomInput
            className="publish-form"
            title="Couleur"
            label="Color"
            type="text"
            placeholder="ex:Rouge, Blanc "
            setState={setColor}
            value={color}
            inputType="input"
          />
          <CustomInput
            className="publish-form"
            title="Etat"
            label="condition"
            type="text"
            placeholder="ex:Neuf, Jamais porté"
            setState={setCondition}
            value={condition}
            inputType="input"
          />
          <CustomInput
            className="publish-form"
            title="Localisation"
            label="city"
            type="text"
            placeholder="ex:Nice"
            setState={setCity}
            value={city}
            inputType="input"
          />
          <CustomInput
            className="publish-form"
            title="Prix"
            label="price"
            type="number"
            placeholder="0,00€"
            setState={setPrice}
            value={price}
            inputType="input"
          />
          <div className="submit-btn">
            <button onClick={handleSubmit}>Envoyer</button>
          </div>
        </form>
      </section>
    </main>
  ) : (
    <main>
      <section className="publish-conection">
        <h2>Connexion</h2>
        <Login />
        <h2>Inscription</h2>
        <Signup />
      </section>
    </main>
  );
};

export default Publish;
