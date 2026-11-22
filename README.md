# PRECISIONS Group — site web

Site vitrine de PRECISIONS Group : communication digitale, développement économique et
plateformes digitales, avec un espace d'administration (prospects, projets, blog, équipe,
FAQ, témoignages, services).

- **Front-end** : React 18, Vite 6, Tailwind CSS, composants shadcn/Radix, TanStack Query
- **Back-end** : [Supabase](https://supabase.com), qui fournit la connexion admin, la base
  PostgreSQL et les Edge Functions (envoi d'email, document de présentation)
- **Emails** : [Resend](https://resend.com)
- **Hébergement** : n'importe quel serveur web statique ; un exemple Nginx est fourni
  dans [deploy/nginx.conf](deploy/nginx.conf)

> Le site fonctionne même sans Supabase configuré : les pages publiques affichent leurs
> contenus par défaut. Seuls les formulaires et l'Admin ont besoin de la base.

---

## 1. Démarrage en local

Prérequis : Node.js 20 ou plus récent.

```bash
npm ci                       # installe les dépendances
cp .env.example .env.local   # puis renseigner les 2 valeurs Supabase (étape 2)
npm run dev                  # http://localhost:5173
```

> **Windows : si `npm ci` reste bloqué sans rien installer**, la protection Defender
> « Accès contrôlé aux dossiers » empêche probablement Node d'écrire dans `Documents`.
> Autorisez `C:\Program Files\nodejs\node.exe` (Sécurité Windows > Protection contre les
> virus et menaces > Gérer la protection contre les ransomware > Autoriser une application),
> ou placez le projet hors de `Documents` (ex. `C:\dev\PRECISION.GROUP`).

Autres commandes : `npm run build` (site de production dans `dist/`), `npm run preview`
(sert `dist/` en local), `npm run lint`.

---

## 2. Mise en place de Supabase (une seule fois)

1. **Créer un projet** sur [supabase.com](https://supabase.com) (offre gratuite suffisante).
2. **Créer les tables** : *SQL Editor* > coller le contenu de
   [supabase/migrations/20261122000000_init.sql](supabase/migrations/20261122000000_init.sql) > *Run*.
3. **Renseigner `.env.local`** avec *Project Settings > API* :
   `VITE_SUPABASE_URL` (Project URL) et `VITE_SUPABASE_ANON_KEY` (clé `anon` / publishable).
   Ces deux valeurs sont publiques par conception. **N'utilisez jamais la clé `service_role`
   dans le site.**
4. **Créer le compte administrateur** :
   - *Authentication > Users > Add user* : email + mot de passe (cocher *Auto confirm*) ;
   - puis dans *SQL Editor* :
     ```sql
     insert into public.admins (user_id)
     select id from auth.users where email = 'votre-email@exemple.com';
     ```
   - recommandé : *Authentication > Sign In / Providers* > désactiver *Allow new users to sign up*.
     Même sans ça, un compte non listé dans `admins` ne peut rien faire.
5. **Déployer les Edge Functions** avec la [CLI Supabase](https://supabase.com/docs/guides/cli) :
   ```bash
   npx supabase login
   npx supabase link --project-ref <ref-du-projet>
   npx supabase functions deploy send-contact-email
   npx supabase functions deploy generate-presentation-doc
   npx supabase secrets set RESEND_API_KEY=re_xxx \
       RESEND_FROM_EMAIL="PRECISIONS <noreply@precisions.group>" \
       CONTACT_TO_EMAIL=contact@precisions.group \
       ALLOWED_ORIGINS=https://precisions.group,http://localhost:5173
   ```
6. **Resend** : vérifier le domaine `precisions.group` (*Domains > Add Domain*, puis ajouter
   les enregistrements DNS SPF/DKIM indiqués). Tant que ce n'est pas fait, l'adresse de test
   `onboarding@resend.dev` ne délivre qu'au propriétaire du compte Resend.

L'Admin est ensuite accessible sur `/Admin`.

---

## 3. Déploiement sur votre serveur

```bash
npm ci
npm run build                 # lit .env.local (ou .env.production) au moment du build
rsync -av --delete dist/ user@serveur:/var/www/precisions.group/
```

Sur le serveur : utiliser [deploy/nginx.conf](deploy/nginx.conf) puis obtenir le certificat HTTPS
avec `certbot --nginx`. La règle `try_files … /index.html` est indispensable : sans elle, les
URL comme `/Contact` renvoient une erreur 404 au rechargement de la page.

Les variables `VITE_*` sont intégrées **au moment du build** : après les avoir modifiées,
il faut reconstruire et redéployer.

---

## 4. Organisation du code

| Dossier / fichier | Rôle |
|---|---|
| [src/pages/](src/pages/) | Une page par fichier ; déclarées dans [src/pages.config.js](src/pages.config.js) |
| [src/components/admin/](src/components/admin/) | Onglets de l'Admin ; [EntityManager.jsx](src/components/admin/EntityManager.jsx) est le gestionnaire générique |
| [src/api/db.js](src/api/db.js) | Accès aux tables : `db.Lead.list()`, `db.BlogPost.filter()`, `db.Project.create()`… |
| [src/api/functions.js](src/api/functions.js) | Appel des Edge Functions |
| [src/lib/supabase.js](src/lib/supabase.js) | Client Supabase |
| [src/lib/AuthContext.jsx](src/lib/AuthContext.jsx) | Session admin (connexion, déconnexion, rôle) |
| [src/hooks/usePublicEntity.js](src/hooks/usePublicEntity.js) | Lecture des contenus publics, avec repli sur les contenus par défaut |
| [public/images/](public/images/) | Logos et photos du site |
| [supabase/migrations/](supabase/migrations/) | Schéma de la base et règles d'accès (RLS) |
| [supabase/functions/](supabase/functions/) | Edge Functions : email de contact, présentation .docx |

### Qui peut faire quoi (règles RLS)

| Table | Visiteur | Administrateur |
|---|---|---|
| `leads` | créer uniquement | tout |
| `testimonials` | proposer (non approuvé), lire les approuvés | tout |
| `blog_posts` | lire les articles publiés | tout |
| `projects`, `services`, `team_members`, `faqs` | lire | tout |

Ces règles sont appliquées par la base elle-même : masquer un bouton dans le navigateur ne
suffit jamais, c'est la base qui refuse.
