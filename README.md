# voyage-partage

Commande pour utiliser docker
```bash
cd back
docker build -t dev .
docker-compose up --build
cd ..
npm run start-front
```

Installer les paquets et lancer le back et front
```bash
npm run install-all
npm run start-back
npm run start-front
```


## **Méthodes de requêtes de l'API**

### **1. Récupérer la liste des voyages**
- **Méthode** : `GET`
- **Endpoint** : `/api/voyages`

#### **Description**
Renvoie la liste des voyages, incluant leur nom et le nombre total de jours associés.

#### **Exemple de requête**
```
GET /api/voyages
```
```json
[
  {
    "id": 1,
    "name": "Voyage à Paris",
    "totalDays": 3
  },
  {
    "id": 2,
    "name": "Voyage en Italie",
    "totalDays": 2
  }
]
```

### **2. Récupérer les informations d'un jour spécifique**
- **Méthode** : `GET`
- **Endpoint** : `/:voyageId/days/:day`
  
#### **Description**
Récupère les informations des points d'intérêt et des routes pour un jour spécifique dans un voyage.

#### **Paramètres**
| Paramètre   | Type      | Requis | Description                             |
|-------------|-----------|--------|-----------------------------------------|
| voyageId    | `integer` | Oui    | Identifiant unique du voyage            |
| day         | `integer` | Oui    | Numéro du jour dans le voyage           |

#### **Exemple de requête**
```
GET /api/voyages/1/days/2
```
```json
{
  "day": 2,
  "locations": [
    {
      "id": 6,
      "name": "Montmartre",
      "description": "Un quartier célèbre pour ses artistes et sa basilique.",
      "position": [
        48.8867,
        2.3431
      ],
      "arrival": "09:00:00",
      "departure": "11:00:00",
      "photos": [
        "https://www.francetourisme.fr/media/Montmartre_jour/sacre-coeur-jour-escaliers.jpg"
      ]
    },
    {
      "id": 7,
      "name": "Arc de Triomphe",
      "description": "Un célèbre monument historique à Paris.",
      "position": [
        48.8738,
        2.295
      ],
      "arrival": "12:00:00",
      "departure": "14:00:00",
      "photos": [
        "https://res.cloudinary.com/dtljonz0f/image/upload/c_fill,w_256,h_256,g_auto/f_auto/q_auto/v1/gc-v1/paris/Sans%20titre%20(37)?_a=BAVARSAP0g"
      ]
    }
  ],
  "routes": [
    {
      "startIndex": 0,
      "endIndex": 1,
      "mode": "foot-walking"
    }
  ]
}
```
