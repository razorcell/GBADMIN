-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le : Mar 29 Mai 2012 à 03:23
-- Version du serveur: 5.5.16
-- Version de PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `TYNEXADMIN`
--

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE IF NOT EXISTS `client` (
  `id_client` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) DEFAULT NULL,
  `prenom` varchar(30) DEFAULT NULL,
  `tel` varchar(15) DEFAULT NULL,
  `tel_societe` varchar(15) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `adresse` text,
  `type` enum('Particulier','Entreprise') NOT NULL,
  `gender` enum('Homme','Femme') DEFAULT NULL,
  `societe` varchar(35) DEFAULT NULL,
  `email_societe` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_client`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `client`
--

INSERT INTO `client` (`id_client`, `nom`, `prenom`, `tel`, `tel_societe`, `fax`, `email`, `adresse`, `type`, `gender`, `societe`, `email_societe`) VALUES
(1, 'Kevin', 'nixon', '0600548565', '', '', 'kevin@gmail.com', '', 'Particulier', 'Homme', '', ''),
(2, 'Fadili', 'Ahmed', NULL, '0521625342', NULL, NULL, NULL, 'Entreprise', NULL, 'AKWA', 'akwa@akwa.com'),
(3, 'Slimani', 'ahmed', '0621458595', '0562125242', '', 'slimani@kotobia.com', 'Bloc N marrakech', 'Entreprise', 'Homme', 'Koutobia', 'koutobia@kotobia.com'),
(4, 'Omar', 'mahmoud', '', '0534543465', '', 'omar@clubmoving.com', '', 'Entreprise', 'Homme', 'Club Moving', 'moving@clubmoving.com'),
(5, 'ahmadi', 'toriya', '0667564532', '', '', 'touriya.ahmadi@gmail.com', '', 'Particulier', 'Femme', '', ''),
(6, 'Fouad', 'tanjaoui', '0665453426', '', '', 'fouad.tanjaoui@gmail.com', '', 'Particulier', 'Homme', '', ''),
(7, 'COULIBALY', 'Mahamadou', '05 45 96 23', '', '', 'mamadou@yahoo.fr', '', 'Particulier', 'Homme', '', ''),
(8, 'COULIBALY', 'Mamadou', '05 65 89 78', '', '', 'mahamadou@yahoo.fr', '', 'Particulier', 'Homme', '', ''),
(9, 'CISSE', 'Jolie', '05 78 89 78', '', '', 'jolie@yahoo.fr', '', 'Particulier', 'Femme', '', ''),
(10, 'DOUMBIA', 'KadiJolie', '64 73 08 88', '', '', 'kadijolie@yahoo.fr', '', 'Particulier', 'Femme', '', ''),
(11, 'Sissoko', 'Dialla', '45 65 98 78', '02 35 78 98', '05 45 78 96', 'dialla@yahoo.fr', 'Bamako, Doumanzana', 'Entreprise', 'Homme', 'SErvices-Ntic', 'services@gmail.com'),
(12, 'Sissoko', 'Mamadou', '45 12 98 78', '45 65 78 98', '45 65 78 98', 'sissoko@yahoo.fr', 'Bamako, Medina Coura', 'Entreprise', 'Homme', 'OuagadouSoft', 'ouagadou@ouagadou.net'),
(13, 'Dembele', 'Mariam', '45 12 98 78 78', '85 96 74 52', '15 59 75 53', 'mariam@yahoo.fr', 'Kalaban Coura', 'Entreprise', 'Femme', 'KokoSoft', 'kokosoft@kokosotf.org'),
(14, 'Tidjani', 'CISSE', '12 45 78 98', '45 78 98 45 65', '25 85 36 96 45', 'tidjani@yahoo.fr', 'Kalaban Coura', 'Entreprise', 'Homme', 'Freres CISSE', 'frerescisse@frerescisse.fr');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE IF NOT EXISTS `commande` (
  `id_commande` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `libelle_commande` text NOT NULL,
  PRIMARY KEY (`id_commande`),
  UNIQUE KEY `id_commande` (`id_commande`,`id_client`),
  KEY `id_client` (`id_client`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=20 ;

--
-- Contenu de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `id_client`, `libelle_commande`) VALUES
(1, 1, 'Economic forum, from M.ALAMI'),
(18, 4, 'Organization d''un evenement pour rassembler les experts et professionnel du sport'),
(19, 3, 'Pour la journÃ©e opensource');

-- --------------------------------------------------------

--
-- Structure de la table `commentaire`
--

CREATE TABLE IF NOT EXISTS `commentaire` (
  `id_commentaire` int(11) NOT NULL AUTO_INCREMENT,
  `texte` varchar(200) NOT NULL,
  `id_employe` int(11) NOT NULL,
  `id_projet` int(11) NOT NULL,
  PRIMARY KEY (`id_commentaire`),
  KEY `id_employe` (`id_employe`),
  KEY `id_projet` (`id_projet`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `employe`
--

CREATE TABLE IF NOT EXISTS `employe` (
  `id_employe` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(15) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `genre` enum('Femme','Homme') NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` text NOT NULL,
  `tel` varchar(15) NOT NULL,
  `email` varchar(35) NOT NULL,
  `adresse` text NOT NULL,
  `id_poste` int(11) NOT NULL,
  `role` enum('invite','administrateur') NOT NULL DEFAULT 'invite',
  PRIMARY KEY (`id_employe`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  KEY `id_poste` (`id_poste`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

--
-- Contenu de la table `employe`
--

INSERT INTO `employe` (`id_employe`, `nom`, `prenom`, `genre`, `username`, `password`, `tel`, `email`, `adresse`, `id_poste`, `role`) VALUES
(1, 'alami', 'hassan', 'Homme', 'hassan', '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684', '0632125242', 'hassan@gmail.com', 'Bloc A Agadir', 7, 'invite'),
(2, 'mendili', 'karima', 'Femme', 'karima', '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684', '0632201252', 'karima@gmail.com', 'Bloc A Agadir', 7, 'administrateur'),
(3, 'sefrioui', 'abderahman', 'Homme', 'adbo', 'pass', '0635626894', 'adbo@gmail.com', 'Bloc C Agadir', 7, 'invite'),
(4, 'ElGati', 'Saadia', 'Femme', 'saadia', 'saadia', '12 45 78 65 32', 'ssadia@yahoo.fr', 'Dahkal', 6, 'invite'),
(5, 'MANKOU', 'Farel', 'Homme', 'farel', 'farel', '78 98 65 45 12', 'farel@yahoo.fr', 'Salam, Agadir', 8, 'invite'),
(11, 'AHOMAGNON', 'Frejus', 'Homme', 'frejus', 'frejus', '12 45 98 56 32', 'Frejus@yahoo.fr', 'Al Inbiaat', 7, 'invite'),
(12, 'CISSE', 'Aboul', 'Homme', 'pacha', '22c5e56746f01253289ee57dbbfab78a4f9ebda0', '05 27 68 47 03', 'aboulhcisse@gmail.com', 'Dahkla, Residence Al_wid', 6, 'invite');

-- --------------------------------------------------------

--
-- Structure de la table `intervention`
--

CREATE TABLE IF NOT EXISTS `intervention` (
  `id_employe` int(11) NOT NULL,
  `id_projet` int(11) NOT NULL,
  KEY `id_employe` (`id_employe`),
  KEY `id_projet` (`id_projet`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `intervention`
--

INSERT INTO `intervention` (`id_employe`, `id_projet`) VALUES
(1, 15),
(2, 15),
(3, 15),
(3, 43),
(1, 43),
(1, 44),
(2, 44),
(3, 45),
(5, 45),
(11, 45),
(3, 46),
(4, 46),
(1, 46),
(12, 46);

-- --------------------------------------------------------

--
-- Structure de la table `occupation`
--

CREATE TABLE IF NOT EXISTS `occupation` (
  `id_occup` int(11) NOT NULL AUTO_INCREMENT,
  `nom_occup` varchar(25) NOT NULL,
  PRIMARY KEY (`id_occup`),
  UNIQUE KEY `nom_occup` (`nom_occup`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Contenu de la table `occupation`
--

INSERT INTO `occupation` (`id_occup`, `nom_occup`) VALUES
(18, 'Assistant en gestion admi'),
(21, 'Assistant en gestion des '),
(17, 'Assistant logistique'),
(12, 'Designer'),
(15, 'Manager'),
(14, 'Network security expert'),
(11, 'Programmer'),
(19, 'Responsable des affaires '),
(20, 'SecrÃ©taire d''Ã©dition'),
(13, 'SEO expert'),
(16, 'test');

-- --------------------------------------------------------

--
-- Structure de la table `occuper`
--

CREATE TABLE IF NOT EXISTS `occuper` (
  `id_employe` int(11) NOT NULL,
  `id_occup` int(11) NOT NULL,
  PRIMARY KEY (`id_employe`,`id_occup`),
  KEY `id_occup` (`id_occup`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `occuper`
--

INSERT INTO `occuper` (`id_employe`, `id_occup`) VALUES
(1, 11),
(12, 11),
(12, 12),
(4, 13),
(4, 14),
(11, 14),
(2, 15),
(5, 15),
(11, 15),
(5, 16),
(11, 16),
(3, 17),
(3, 21);

-- --------------------------------------------------------

--
-- Structure de la table `pack`
--

CREATE TABLE IF NOT EXISTS `pack` (
  `id_pack` int(10) NOT NULL AUTO_INCREMENT,
  `libelle_pack` varchar(20) NOT NULL,
  `id_type_service` int(11) NOT NULL,
  PRIMARY KEY (`id_pack`),
  KEY `libelle_pack` (`libelle_pack`),
  KEY `id_type_service` (`id_type_service`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=26 ;

--
-- Contenu de la table `pack`
--

INSERT INTO `pack` (`id_pack`, `libelle_pack`, `id_type_service`) VALUES
(7, 'Pack Etudiant', 13),
(8, 'Pack Professionnel', 13),
(9, 'Pack Entreprise', 13),
(10, 'Pack Silver', 14),
(11, 'Pack Gold', 14),
(12, 'Pack DÃ©butant', 15),
(13, 'Pack Amateur', 15),
(14, 'Pack Professionnel', 15),
(15, 'Pack  Z3em', 15),
(16, 'Pack  Z3em', 15),
(17, 'Pack Ya Salam', 15),
(18, 'Pack Maftou7', 15),
(19, 'Pack Add Klimat', 15),
(20, 'tm Etudiant', 13),
(21, 'tm Start ', 13),
(22, 'tm Basic', 13),
(23, 'tm Business', 13),
(24, 'tm Pro', 13),
(25, 'tm VPServe', 13);

-- --------------------------------------------------------

--
-- Structure de la table `poste`
--

CREATE TABLE IF NOT EXISTS `poste` (
  `id_poste` int(11) NOT NULL AUTO_INCREMENT,
  `nom_poste` varchar(15) NOT NULL,
  PRIMARY KEY (`id_poste`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=11 ;

--
-- Contenu de la table `poste`
--

INSERT INTO `poste` (`id_poste`, `nom_poste`) VALUES
(6, 'Stagiaire'),
(7, 'Personnel'),
(8, 'Freelance'),
(9, 'Directeur'),
(10, 'MenagÃ¨re');

-- --------------------------------------------------------

--
-- Structure de la table `projet`
--

CREATE TABLE IF NOT EXISTS `projet` (
  `id_projet` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `prix` float NOT NULL,
  `progression` int(11) NOT NULL,
  `status` enum('Actif','Interrompu') NOT NULL,
  `date_debut` text NOT NULL,
  `date_fin` text NOT NULL,
  `id_type_projet` int(11) NOT NULL,
  `paye` enum('Non','Oui') NOT NULL,
  `id_commande` int(11) NOT NULL,
  `priorite` enum('p1','p2','p3') NOT NULL DEFAULT 'p3',
  PRIMARY KEY (`id_projet`),
  KEY `id_type_projet` (`id_type_projet`),
  KEY `id_commande` (`id_commande`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=47 ;

--
-- Contenu de la table `projet`
--

INSERT INTO `projet` (`id_projet`, `description`, `prix`, `progression`, `status`, `date_debut`, `date_fin`, `id_type_projet`, `paye`, `id_commande`, `priorite`) VALUES
(15, 'Hotel farah demander pas M.Skali Haut prioritÃ©', 12000, 35, 'Actif', '01.05.2012', '31.05.2012', 3, 'Non', 1, 'p1'),
(43, 'Fort recommendation sur le style(couleur, banniÃ©re...), contrainte de couleur : bleu', 5000, 30, 'Actif', '01.05.2012', '16.08.2012', 4, 'Oui', 18, 'p3'),
(44, 'some bla bla bla', 5900, 56, 'Actif', '13.06.2012', '27.09.2012', 3, 'Non', 1, 'p3'),
(45, 'some description', 6500, 29, 'Actif', '01.05.2012', '24.05.2012', 4, 'Non', 19, 'p3'),
(46, 'some description', 6500, 56, 'Actif', '10.05.2012', '08.06.2012', 4, 'Non', 19, 'p2');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE IF NOT EXISTS `service` (
  `id_service` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(50) NOT NULL,
  `prix` smallint(6) NOT NULL,
  `date_debut` text NOT NULL,
  `date_fin` text NOT NULL,
  `status` enum('Actif','Interrompu') NOT NULL,
  `id_type_service` int(11) DEFAULT NULL,
  `id_pack` int(11) DEFAULT NULL,
  `paye` enum('Non','Oui') NOT NULL,
  `id_commande` int(11) NOT NULL,
  PRIMARY KEY (`id_service`),
  KEY `id_pack` (`id_pack`),
  KEY `id_commande` (`id_commande`),
  KEY `id_type_service` (`id_type_service`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=22 ;

--
-- Contenu de la table `service`
--

INSERT INTO `service` (`id_service`, `description`, `prix`, `date_debut`, `date_fin`, `status`, `id_type_service`, `id_pack`, `paye`, `id_commande`) VALUES
(13, 'l''hebergement pack entreprise', 1000, '01.04.2012', '21.06.2012', 'Actif', 13, 9, 'Non', 18),
(14, '', 700, '01.04.2012', '31.07.2012', 'Interrompu', 15, 14, 'Oui', 18),
(16, 'www.opensource.com', 1000, '01.05.2012', '29.05.2012', 'Actif', 13, 14, 'Oui', 19),
(17, 'prioritÃ© google', 1000, '01.05.2012', '28.06.2012', 'Actif', 15, 14, 'Oui', 19),
(18, 'www.rien.fr', 500, '29.05.2012', '31.05.2012', 'Interrompu', 13, 22, 'Oui', 18),
(19, 'L''entreprise Kokosoft', 800, '01.05.2012', '07.06.2012', 'Actif', 13, 9, 'Oui', 19),
(20, 'www.etudiant.com', 1, '01.05.2012', '02.05.2012', 'Interrompu', 13, 7, 'Oui', 18),
(21, 'some bli bli bli', 1000, '02.05.2012', '24.05.2012', 'Actif', 13, 7, 'Non', 1);

-- --------------------------------------------------------

--
-- Structure de la table `type_projet`
--

CREATE TABLE IF NOT EXISTS `type_projet` (
  `id_type_projet` int(11) NOT NULL AUTO_INCREMENT,
  `nom_type_projet` varchar(30) NOT NULL,
  PRIMARY KEY (`id_type_projet`),
  UNIQUE KEY `nom_type_projet` (`nom_type_projet`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Contenu de la table `type_projet`
--

INSERT INTO `type_projet` (`id_type_projet`, `nom_type_projet`) VALUES
(5, 'CD-Rom Interactifs'),
(3, 'Desktop application'),
(2, 'Mobile application'),
(4, 'Web application');

-- --------------------------------------------------------

--
-- Structure de la table `type_service`
--

CREATE TABLE IF NOT EXISTS `type_service` (
  `id_type_service` int(10) NOT NULL AUTO_INCREMENT,
  `libelle_type_service` varchar(30) NOT NULL,
  PRIMARY KEY (`id_type_service`),
  UNIQUE KEY `libelle_type_service` (`libelle_type_service`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Contenu de la table `type_service`
--

INSERT INTO `type_service` (`id_type_service`, `libelle_type_service`) VALUES
(17, 'Conseil et Audi'),
(13, 'Hebergement'),
(14, 'Nom de Domaine'),
(15, 'Referencement');

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_client`) REFERENCES `client` (`id_client`) ON DELETE CASCADE;

--
-- Contraintes pour la table `employe`
--
ALTER TABLE `employe`
  ADD CONSTRAINT `employe_ibfk_1` FOREIGN KEY (`id_poste`) REFERENCES `poste` (`id_poste`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `intervention`
--
ALTER TABLE `intervention`
  ADD CONSTRAINT `intervention_ibfk_1` FOREIGN KEY (`id_employe`) REFERENCES `employe` (`id_employe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `intervention_ibfk_2` FOREIGN KEY (`id_projet`) REFERENCES `projet` (`id_projet`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `occuper`
--
ALTER TABLE `occuper`
  ADD CONSTRAINT `occuper_ibfk_1` FOREIGN KEY (`id_occup`) REFERENCES `occupation` (`id_occup`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pack`
--
ALTER TABLE `pack`
  ADD CONSTRAINT `pack_ibfk_1` FOREIGN KEY (`id_type_service`) REFERENCES `type_service` (`id_type_service`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `projet`
--
ALTER TABLE `projet`
  ADD CONSTRAINT `projet_ibfk_5` FOREIGN KEY (`id_type_projet`) REFERENCES `type_projet` (`id_type_projet`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projet_ibfk_6` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `service`
--
ALTER TABLE `service`
  ADD CONSTRAINT `service_ibfk_2` FOREIGN KEY (`id_pack`) REFERENCES `pack` (`id_pack`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_ibfk_3` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_ibfk_4` FOREIGN KEY (`id_type_service`) REFERENCES `type_service` (`id_type_service`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
