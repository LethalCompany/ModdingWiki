---
description: A basic overview of the Open Source approach used by the Lethal Company modding community.
---

# Open-source et éthique

## Qu'est-ce que l'open-source ?

Le terme "open-source" signifie que le code est accessible au public et peut être utilisé, modifié et distribué par n'importe qui. Il favorise une approche collaborative et publique du développement de logiciels. Il y a cependant un certain nombre d'éléments importants à prendre en compte
lors du développement d'un logiciel libre.

### Licenses

Un dépôt GitHub _sans_ licence n'est **pas** open-source :

> sans licence, les lois sur les droits d'auteur s'appliquent par défaut, ce qui signifie que vous conservez tous les droits sur votre code source et que personne ne peut reproduire, distribuer ou créer des œuvres dérivées de votre travail.
>
> _source: https\://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository#choosing-the-right-license_

Cela signifie que si vous voulez vraiment mettre vos mods en open-source, vous devrez choisir une licence open-source.
Cela peut sembler effrayant, mais ce n'est pas une fatalité. GitHub a créé un site web très simple et sympa pour trouver une
qui correspond à votre projet : https\://choosealicense.com/

:::warning
**Obligatory "we are not lawyers". Notre interprétation de ces licences est principalement basée sur le site `choosealicense`, ainsi que sur notre expérience personnelle.**
:::

Nous recommandons d'opter pour l'une des deux licences suivantes pour les mods :

- [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/) -- le principal avantage de cette licence est que toute personne utilisant le code de votre mod (qu'il s'agisse d'une version dérivée, d'une version mise à jour, ou dans d'autres jeux) _devra_ également utiliser cette licence. Cela signifie que votre travail et tout travail dérivé, restera open-source. Cela signifie que les gens ne peuvent pas s'emparer de votre travail et créer une version qui n'a pas de code public, et cela signifie que la communauté sera toujours en mesure de construire sur votre travail et de maintenir votre mod en vie, même si vous vous désintéressez du sujet.
- [MIT License](https://choosealicense.com/licenses/mit/) -- il s'agit d'une version plus permissive de la GNU General Public License. Il permet également aux utilisateurs de créer des versions _closed-source_ de votre mod. Cela signifie qu'un utilisateur n'est pas tenu de partager publiquement son code mis à jour. Ils doivent toutefois conserver la mention du droit d'auteur de la licence d'origine.

### Collaboration saine

Une communauté de moddeurs prospère lorsque les utilisateurs s'entraident. Garder vos mods en open-source signifie que les moddeurs actuels (et futurs) peuvent apprendre de votre travail actuel et peut-être même garder vos mods à jour si vous quittez la communauté.

Il est toutefois important de faire preuve d'éthique à cet égard. Nous comprenons que la communauté des moddeurs peut être compétitive. S'il vous plaît, abstenez-vous de prendre du code et de le revendiquer comme étant le vôtre - donnez toujours correctement le crédit là où il est dû.

De même, lorsque d'autres utilisateurs vous aident en corrigeant des bugs et veulent soumettre une "pull request", veuillez l'accepter, plutôt que de prendre la correction et de l'implémenter vous-même - cela leur donne un peu de crédit pour la correction, et favorise une communauté où les gens n'ont pas peur de s'entraider.
