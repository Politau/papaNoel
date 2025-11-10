# Ma Liste de Cadeaux du Père Noël 🎅

Site web interactif listant mes cadeaux souhaités.  
Les articles sont générés dynamiquement à partir d’un fichier JSON, avec titre, image et description.  
Chaque cadeau est cliquable et ouvre une modale centrée avec plus d’informations.

🌐 **Site en ligne :** [https://politau.github.io/papaNoel/](https://politau.github.io/papaNoel/)

---

## Ajouter un cadeau

1. Ouvrir `data/data.json`.  
2. Ajouter un objet avec le titre, lien, image et description, par exemple :

```json
{
  "titre": "Nouveau livre cool",
  "lien": "https://www.amazon.fr/...",
  "image": "image/nouveau.png",
  "description": "Un livre incroyable à lire !"
}
```
3. Enregistrer et actualiser la page : le nouveau cadeau apparaît automatiquement.




## Structure du projet
```bash
/index.html       → Page principale
/css/styles.css   → Styles du site
/js/script.js     → Script pour générer les articles et gérer la modale
/data/data.json   → Liste des cadeaux
/image/...        → Images des cadeaux

```


## Auteur
Réalisé avec ❤️ par Paul Ruiz