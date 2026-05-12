# Atelier de Couture Élégance – Site Web

Site web complet pour atelier de couture à Lomé, Togo. Mobile-first, multilingue (FR/EE), avec CMS intégré et paiement Mobile Money.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+
- Compte [Netlify](https://netlify.com) (gratuit)
- Compte [Cloudinary](https://cloudinary.com) (gratuit)
- Compte [CinetPay](https://cinetpay.com) (pour les paiements)

### Installation locale

```bash
# Cloner le projet
git clone https://github.com/votre-repo/tailor-website.git
cd tailor-website

# Installer les dépendances
npm install

# Copier et remplir les variables d'environnement
cp .env.example .env.local
# Remplir NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CINETPAY_API_KEY, CINETPAY_SITE_ID

# Lancer en mode développement
npm run dev
```

Le site sera disponible sur [http://localhost:3000](http://localhost:3000).

## 🌐 Déploiement sur Netlify

### 1. Pousser sur GitHub
```bash
git init && git add . && git commit -m "Initial commit"
git remote add origin https://github.com/votre-repo/tailor-website.git
git push -u origin main
```

### 2. Connecter à Netlify
1. Connectez-vous sur [app.netlify.com](https://app.netlify.com)
2. Cliquez **"Add new site" → "Import an existing project"**
3. Choisissez votre dépôt GitHub
4. Paramètres de build :
   - **Build command** : `npm run build`
   - **Publish directory** : `.next`
5. Cliquez **"Deploy site"**

### 3. Variables d'environnement sur Netlify
Dans **Site settings → Environment variables**, ajoutez :
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` → Votre cloud Cloudinary
- `CINETPAY_API_KEY` → Votre clé API CinetPay (secrète)
- `CINETPAY_SITE_ID` → Votre Site ID CinetPay
- `NEXT_PUBLIC_SITE_URL` → Votre domaine (ex: `https://elegance.tg`)

### 4. Activer Netlify Identity
1. Dans **Site settings → Identity**, cliquez **"Enable Identity"**
2. Sous **Registration**, choisissez **"Invite only"**
3. Sous **Services → Git Gateway**, cliquez **"Enable Git Gateway"**
4. **Invitez le couturier** : Identity → **"Invite users"** → entrez son email

### 5. Domaine personnalisé
Dans **Domain settings**, ajoutez votre domaine `.tg`.

---

## 📝 Guide du CMS pour le couturier

### Accéder au panneau d'administration
1. Ouvrez `https://votre-site.tg/admin`
2. Cliquez **"Log in with Netlify Identity"**
3. Connectez-vous avec l'email et mot de passe reçus par invitation

### Gérer les photos (Portfolio)
1. Cliquez **"🖼️ Portfolio"** dans le menu de gauche
2. Cliquez **"New Portfolio"** pour ajouter une création
3. Remplissez le titre, la catégorie et la date
4. **Pour l'image** : Ouvrez [cloudinary.com](https://cloudinary.com), uploadez votre photo, copiez l'URL et collez-la dans le champ "Image (URL Cloudinary)"
5. Cliquez **"Save"** puis **"Publish"**

> ⏱️ Le site se mettra à jour automatiquement dans 2-3 minutes après publication.

### Modifier les informations du site
1. Cliquez **"⚙️ Paramètres du site"**
2. Modifiez le nom, téléphone WhatsApp, etc.
3. **Sauvegardez et publiez**

### Ajouter des témoignages
1. Cliquez **"💬 Témoignages"**
2. Cliquez **"New Testimonials"**
3. Remplissez le nom, texte et note (1 à 5 étoiles)
4. Sauvegardez et publiez

---

## 🏗️ Architecture technique

```
tailor-website/
├── content/          # Contenus gérés par le CMS (Markdown)
│   ├── portfolio/    # Réalisations
│   ├── testimonials/ # Témoignages
│   ├── pages/        # Pages statiques (services, about)
│   ├── products/     # Articles en boutique
│   └── site-settings/# Paramètres du site
├── public/
│   ├── admin/        # Interface Decap CMS
│   └── images/       # Images statiques et icônes
└── src/
    ├── app/          # Pages Next.js (App Router)
    ├── components/   # Composants React réutilisables
    ├── lib/          # Utilitaires (markdown, cloudinary)
    └── i18n/         # Traductions FR / EWE
```

## 💳 Paiement CinetPay

Le paiement est géré via l'API route `/api/payment` qui :
1. Reçoit le montant et les infos produit du navigateur
2. Appelle l'API CinetPay côté serveur (clé API jamais exposée)
3. Retourne une URL de paiement → le client est redirigé
4. CinetPay affiche les options : MTN Mobile Money, Moov Money, etc.
5. Après paiement : redirection vers `/payment-success`

---

## 📸 Cloudinary – Guide rapide

1. Créez un compte sur [cloudinary.com](https://cloudinary.com) (gratuit)
2. Votre **Cloud Name** est visible en haut du dashboard
3. Pour uploader : cliquez **"Media Library"** → **"Upload"**
4. Après upload, cliquez sur l'image → **"Copy URL"**
5. Collez cette URL dans le CMS

---

## 🌍 Internationalisation

- **Français** : langue par défaut, tous les contenus
- **Ewe** : traductions des éléments d'interface (boutons, labels)
- Les traductions sont dans `src/i18n/dictionaries/`

Pour ajouter des traductions Ewe manquantes, modifiez `src/i18n/dictionaries/ee.json`.

---

## 📄 Licence

Développé pour Atelier de Couture Élégance, Lomé, Togo 🇹🇬
