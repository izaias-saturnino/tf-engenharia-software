﻿// <auto-generated />
using System;
using INF_01127.Database.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace INF_01127.Migrations
{
    [DbContext(typeof(Context))]
    partial class ContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("INF_01127.Models.Actors.DonationModel", b =>
                {
                    b.Property<int>("DonationIdentification")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Identification");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DonationIdentification"));

                    b.Property<int?>("DonorIdentification")
                        .HasColumnType("int")
                        .HasColumnName("DonorIdentification");

                    b.Property<int>("KitchenIdentification")
                        .HasColumnType("int")
                        .HasColumnName("KitchenIdentification");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Name");

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)")
                        .HasColumnName("Price");

                    b.Property<int>("Quantity")
                        .HasColumnType("int")
                        .HasColumnName("Quantity");

                    b.Property<string>("Unit")
                        .IsRequired()
                        .HasMaxLength(8)
                        .HasColumnType("nvarchar(8)")
                        .HasColumnName("Unit");

                    b.HasKey("DonationIdentification");

                    b.ToTable("Donations");
                });

            modelBuilder.Entity("INF_01127.Models.Actors.DonorModel", b =>
                {
                    b.Property<int>("Identification")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Identification");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Identification"));

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("EmailAddress");

                    b.Property<string>("ITR")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("ITR");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Password");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("PhoneNumber");

                    b.HasKey("Identification");

                    b.HasIndex("EmailAddress")
                        .IsUnique();

                    b.HasIndex("ITR")
                        .IsUnique();

                    b.HasIndex("PhoneNumber")
                        .IsUnique();

                    b.ToTable("Donors");
                });

            modelBuilder.Entity("INF_01127.Models.Actors.EventModel", b =>
                {
                    b.Property<int>("EventIdentification")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("EventIdentification");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EventIdentification"));

                    b.Property<DateTime>("Date")
                        .HasColumnType("datetime2")
                        .HasColumnName("Data");

                    b.Property<int>("KitchenIdentification")
                        .HasColumnType("int")
                        .HasColumnName("KitchenIdentification");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Location");

                    b.Property<int>("Public")
                        .HasColumnType("int")
                        .HasColumnName("Public");

                    b.HasKey("EventIdentification");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("INF_01127.Models.Actors.KitchenModel", b =>
                {
                    b.Property<int>("Identification")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Identification");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Identification"));

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Description");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("EmailAddress");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)")
                        .HasColumnName("Location");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Password");

                    b.Property<bool>("Validated")
                        .HasColumnType("bit")
                        .HasColumnName("Validated");

                    b.HasKey("Identification");

                    b.HasIndex("EmailAddress")
                        .IsUnique();

                    b.ToTable("Kitchens");
                });

            modelBuilder.Entity("INF_01127.Models.Actors.ManagerModel", b =>
                {
                    b.Property<int>("Identification")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Identification");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Identification"));

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("EmailAddress");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)")
                        .HasColumnName("Name");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Password");

                    b.HasKey("Identification");

                    b.HasIndex("EmailAddress")
                        .IsUnique();

                    b.ToTable("Managers");
                });

            modelBuilder.Entity("INF_01127.Models.Actors.UserModel", b =>
                {
                    b.Property<int>("Identification")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("Identification");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Identification"));

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)")
                        .HasColumnName("EmailAddress");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)")
                        .HasColumnName("Password");

                    b.Property<bool>("Type")
                        .HasColumnType("bit")
                        .HasColumnName("Type");

                    b.HasKey("Identification");

                    b.HasIndex("EmailAddress")
                        .IsUnique();

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
